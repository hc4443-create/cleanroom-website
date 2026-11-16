// ─────────────────────────────────────────────────────────────
//  HEADROOM ESTIMATE: the maths behind the home-page calculator.
//  Shared by the server render and the browser script, so the two
//  can never disagree. Every constant is either a published figure
//  (source noted) or a stated modelling assumption.
// ─────────────────────────────────────────────────────────────

// ── Published anchors ────────────────────────────────────────
// DeepSeek-V3/R1 production serving, 24 h window (DeepSeek-AI, "Inference System
// Overview", Feb 2025): 608B input tokens (342B, 56.3%, were KV-cache hits),
// 168B output tokens, 226.75 nodes of 8 H800 GPUs on average. Per node:
// ~73.7k input tokens/s while prefilling, ~14.8k output tokens/s while decoding.
// Average output speed 20–22 tokens/s; average KV-cache length ~4,989 tokens.
const DS_OUTPUT = 168e9;
const DS_INPUT = 608e9;
const DS_INPUT_COMPUTED = 608e9 - 342e9;          // cache hits skip the model
const DS_GPUS = 226.75 * 8;
const SECONDS = 24 * 3600;
/** Output tokens/s per H800 GPU across DeepSeek's whole fleet, input processing included. ≈1,070 */
export const BASE_RATE = DS_OUTPUT / SECONDS / DS_GPUS;
/** Share of fleet GPU time spent on prefill (input) vs decode (output), from the per-phase rates. ≈0.42 */
const PREFILL_SHARE = (DS_INPUT / DS_OUTPUT / 73_700) / (DS_INPUT / DS_OUTPUT / 73_700 + 1 / 14_800);
/** Tokens that pass through the model per output token (output + non-cached input). ≈2.6 */
const TOKENS_PER_OUTPUT = 1 + DS_INPUT_COMPUTED / DS_OUTPUT;

export const REQ_TPS = 20;      // output tokens/s per request (DeepSeek: 20–22)
export const CTX = 5000;        // KV-cache tokens per request in flight (DeepSeek: ~4,989)
export const MARGIN = 0.15;     // share of each GPU's memory always left free for the host job
export const H200_SERVER_GB = 8 * 141;

// ── GPUs ─────────────────────────────────────────────────────
// Prefill is compute-bound and decode is memory-bandwidth-bound, so each GPU is
// scaled from the H800 (FP8 1,979 TFLOPS dense, 3,350 GB/s) on both, weighted by
// how DeepSeek's fleet splits its time. A100s have no FP8, so they use BF16 (312).
const H800 = { tflops: 1979, bw: 3350 };
const gpuFactor = (tflops: number, bw: number) =>
  1 / (PREFILL_SHARE * (H800.tflops / tflops) + (1 - PREFILL_SHARE) * (H800.bw / bw));

export const GPUS = [
  { id: 'a100-40', label: 'A100 40GB', mem: 40, tflops: 312, bw: 1555 },
  { id: 'a100-80', label: 'A100 80GB', mem: 80, tflops: 312, bw: 2039 },
  { id: 'h100', label: 'H100 80GB', mem: 80, tflops: 1979, bw: 3350 },
  { id: 'gh200', label: 'GH200 96GB', mem: 96, tflops: 1979, bw: 4000 },
  { id: 'h200', label: 'H200 141GB', mem: 141, tflops: 1979, bw: 4800 },
].map((g) => ({ ...g, factor: gpuFactor(g.tflops, g.bw) }));

export const NETS = [400, 200, 100, 50, 25]; // Gb/s of network per GPU (DeepSeek’s cluster: 400; 25 ≈ older Ethernet)

// ── Models (from each model's published architecture) ───────
// gb      weight memory at published precision
// active  parameters used per token (billions)
// kv      KV-cache bytes per token, BF16 (gpt-oss: full-attention layers only;
//         its sliding-window layers keep just 128 tokens)
// net     network bytes per token, from the model's published dimensions
export const MODELS = [
  { name: 'DeepSeek-V3', note: '671B, 37B active', gb: 671, active: 37, kv: 61 * 576 * 2, net: 8 * 7168 * 2 * 58 },
  { name: 'Qwen3-235B', note: '235B, 22B active', gb: 235, active: 22, kv: 94 * 2 * 4 * 128 * 2, net: 8 * 4096 * 2 * 94 },
  { name: 'gpt-oss-120b', note: '117B, 5.1B active', gb: 62, active: 5.1, kv: 18 * 2 * 8 * 64 * 2, net: 4 * 2880 * 2 * 36 },
].map((m) => ({
  ...m,
  // Assumption: other models scale from DeepSeek by active parameters, to the
  // power 0.75, because attention and overheads shrink more slowly than the experts.
  rate: BASE_RATE * (37 / m.active) ** 0.75,
}));

export type Limit = 'compute' | 'interconnect' | 'memory';
export type Row = { fits: boolean; tps: number; limit: Limit | '' };

/**
 * For each model, output tokens/s is the lowest of three limits:
 *  compute       idle GPUs × the model's rate × GPU-type factor
 *  interconnect  idle GPUs × network bytes/s ÷ network bytes per output token
 *  memory        requests that fit in the memory left after the weights × 20 tokens/s
 */
export function estimate(gpus: number, gpuId: string, used: number, idle: number, netGbps: number) {
  const gpu = GPUS.find((g) => g.id === gpuId) ?? GPUS[2];
  const raw = gpus * gpu.mem * (1 - used / 100 - MARGIN);
  const spare = raw < 1e-6 ? 0 : raw; // snap float noise (e.g. 85% + 15%) to exactly zero
  const idleGpus = gpus * (idle / 100);
  const rows: Row[] = MODELS.map((m) => {
    if (spare < m.gb) return { fits: false, tps: 0, limit: '' };
    const limits: [Limit, number][] = [
      ['compute', idleGpus * m.rate * gpu.factor],
      ['interconnect', (idleGpus * (netGbps * 1e9) / 8) / (m.net * TOKENS_PER_OUTPUT)],
      ['memory', (((spare - m.gb) * 1e9) / (m.kv * CTX)) * REQ_TPS],
    ];
    const [limit, tps] = limits.reduce((a, b) => (b[1] < a[1] ? b : a));
    return { fits: true, tps, limit };
  });
  return { spare, idleGpus, rows };
}

// ── Formatting ───────────────────────────────────────────────
export const fmtGb = (gb: number) => (gb >= 1000 ? `${(gb / 1000).toFixed(1)} TB` : `${Math.round(gb)} GB`);
/** "As much memory as 10 eight-GPU H200 servers." Whole servers, plain words at the edges. */
export const fmtServers = (gb: number) => {
  if (gb <= 0) return 'No spare memory at this level of use.';
  const n = Math.round(gb / H200_SERVER_GB);
  const count = n < 1 ? 'less than one eight-GPU H200 server' : n === 1 ? 'one eight-GPU H200 server' : `${n.toLocaleString('en-US')} eight-GPU H200 servers`;
  return `As much memory as ${count}.`;
};
export const fmtGpus = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
/** Two significant figures, so throughput reads as the approximation it is. */
export const round2 = (n: number) => {
  if (n <= 0) return 0;
  const p = 10 ** (Math.floor(Math.log10(n)) - 1);
  return Math.round(n / p) * p;
};
export const fmtTps = (n: number) => (n > 0 ? `~${round2(n).toLocaleString('en-US')}` : '—');
/** The line under each model's number. */
export const fmtLimit = (row: Row) =>
  !row.fits ? 'needs more memory' : row.tps <= 0 ? 'needs idle GPU time' : `${row.limit}-limited`;
