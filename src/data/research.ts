// ─────────────────────────────────────────────────────────────
//  RESEARCH DATA: every number on the site comes from here.
//  Only published, citable sources. Our own cluster measurements
//  are deliberately left off the site.
// ─────────────────────────────────────────────────────────────

export type Source = {
  id: string;
  authors?: string;
  title: string;
  venue: string;
  url: string;
  preprint?: string | null;
};

export const SOURCES = {
  li2023: {
    id: 'li2023',
    authors: 'Li, Michelogiannakis, Cook, Cooray and Chen',
    title: "Analyzing Resource Utilization in an HPC System: A Case Study of NERSC's Perlmutter",
    venue: 'ISC High Performance 2023, LNCS vol. 13948, pp. 297–316',
    url: 'https://link.springer.com/chapter/10.1007/978-3-031-32041-5_16',
    preprint: 'https://arxiv.org/pdf/2301.05145',
  },
  sencan2025: {
    id: 'sencan2025',
    authors: 'Sencan, Kulkarni, Coskun and Konate',
    title: 'Analyzing GPU Utilization in HPC Workloads: Insights from Large-Scale Systems',
    venue: "PEARC '25 (ACM)",
    url: 'https://www.bu.edu/peaclab/files/2025/07/GPU_Utilization_Analysis_PEARC25.pdf',
    preprint: null,
  },
  kth2026: {
    id: 'kth2026',
    authors: 'Schieffer, Shi, Ren and Peng',
    title: 'Taming GPU Underutilization via Static Partitioning and Fine-grained CPU Offloading',
    venue: 'ISC High Performance 2026 (arXiv 2604.08451)',
    url: 'https://arxiv.org/pdf/2604.08451',
    preprint: null,
  },
  deepseek: {
    id: 'deepseek',
    authors: 'DeepSeek-AI',
    title: 'DeepSeek-V3 Technical Report',
    venue: 'arXiv 2412.19437',
    url: 'https://arxiv.org/abs/2412.19437',
    preprint: null,
  },
  tpc26: {
    id: 'tpc26',
    title: 'TPC26: Toward Scientific AI Platforms at HPC Facilities',
    venue: 'HPCwire, June 2026',
    url: 'https://hpcwire.com/2026/06/09/tpc26-toward-scientific-ai-platforms-at-hpc-facilities/',
  },
  argonne: {
    id: 'argonne',
    title: 'New AI inference service for science',
    venue: 'Globus',
    url: 'https://www.globus.org/news/new-ai-inference-service-for-science',
  },
  memory: {
    id: 'memory',
    title: 'Memory shortage market trends',
    venue: 'Channel Insider, 2026',
    url: 'https://www.channelinsider.com/ai/memory-shortage-market-trends/',
  },
  gpuPrices: {
    id: 'gpuPrices',
    title: 'NVIDIA AI GPU pricing guide',
    venue: 'IntuitionLabs',
    url: 'https://intuitionlabs.ai/articles/nvidia-ai-gpu-pricing-guide',
  },
} satisfies Record<string, Source>;

// Headline stats: GPU memory sits idle on HPC clusters.
export const IDLE_MEMORY = [
  {
    stat: '~50%',
    label: 'of GPU jobs on NERSC’s Perlmutter used a quarter of GPU memory or less',
    source: SOURCES.li2023,
    short: 'Li et al., ISC 2023',
  },
  {
    stat: '28.6%',
    label: 'average peak GPU memory use across 118,276 HPC jobs',
    source: SOURCES.sencan2025,
    short: "Sencan et al., PEARC '25",
  },
  {
    stat: '37%',
    label: 'of jobs in that study never used more than 15% of GPU memory',
    source: SOURCES.sencan2025,
    short: "Sencan et al., PEARC '25",
  },
];

// Busy compute, empty memory: GPUs are working, their memory isn't.
export const BUSY_BUT_EMPTY = [
  {
    stat: '63%',
    label: 'of jobs in the same 118,276-job study pushed GPU utilization to 75% or higher, together covering 80% of GPU node-hours',
    source: SOURCES.sencan2025,
    short: "Sencan et al., PEARC '25",
  },
  {
    stat: '1 GB of 96 GB',
    label: 'of GPU memory was enough for the docking code AutoDock on a Grace Hopper GPU',
    source: SOURCES.kth2026,
    short: "Schieffer et al., ISC '26",
  },
  {
    stat: '1.4×',
    label: 'throughput, and 26% less energy on average, when HPC codes shared a GPU instead of running one after another',
    source: SOURCES.kth2026,
    short: "Schieffer et al., ISC '26",
  },
];

// Why mixture-of-experts models fit spare memory.
export const MOE_FIT = [
  {
    stat: '97%',
    label: 'of a 671B-parameter DeepSeek-V3 model is routed experts: memory-heavy, compute-light',
  },
  {
    stat: '8 of 256',
    label: 'experts per layer are used for any one token',
  },
];

// Demand and cost context.
export const DEMAND = [
  {
    title: 'HPC centers want inference',
    text: 'At TPC26, HPC facility leaders said researchers want inference services and AI agents for daily work, and named cost as the hardest problem.',
    source: SOURCES.tpc26,
  },
  {
    title: 'Models compete for GPUs',
    text: 'Argonne’s inference service lists about 35 models but keeps only about 10 loaded at a time.',
    source: SOURCES.argonne,
  },
  {
    title: 'Memory is scarce and expensive',
    text: 'DRAM prices were expected to rise 50–55% in a single quarter of 2026, with suppliers sold out for the year.',
    source: SOURCES.memory,
  },
  {
    title: 'Dedicated hardware is costly',
    text: 'An 8-GPU H200 server, the usual way to serve a frontier-scale open model, costs about $315,000 before power, staff and floor space.',
    source: SOURCES.gpuPrices,
  },
];
