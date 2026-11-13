// ─────────────────────────────────────────────────────────────
//  RESEARCH DATA: every number on the site comes from here.
//  Source: Cleanroom business plan (Nov 2026).
// ─────────────────────────────────────────────────────────────

// Our own cluster analysis. The university is deliberately not named.
export const CLUSTER_STUDY = {
  description: "a U.S. research university's shared GPU cluster",
  gpuHours: '62,827',
  period: 'Sep 21 – Oct 21, 2026',
  method:
    "Across the cluster's GPU partition, we paired the peak GPU memory of each profiled GPU-hour with its time-averaged GPU compute use.",
};

// Headline findings (share of GPU-hours).
export const CLUSTER_FINDINGS = [
  { value: '55.7%', label: 'peaked at or below 25% of GPU memory' },
  { value: '71.9%', label: 'peaked below 50% of GPU memory' },
  { value: '38.8%', label: 'peaked below 10% of GPU memory' },
  { value: '21.7%', label: 'kept compute 75–100% busy while using 25% or less of GPU memory' },
  { value: '17.6%', label: 'peaked above 75% of GPU memory' },
];

// Heatmap: rows = average GPU compute use, columns = peak GPU memory.
// Values are the share of paired, profiled GPU-hours (%).
export const HEATMAP = {
  bands: ['0–25%', '25–50%', '50–75%', '75–100%'],
  rows: [
    { compute: '0–25%', values: [13.0, 3.8, 1.3, 2.4] },
    { compute: '25–50%', values: [11.7, 2.7, 0.9, 2.6] },
    { compute: '50–75%', values: [9.3, 3.8, 1.1, 2.0] },
    { compute: '75–100%', values: [21.7, 5.9, 7.2, 10.6] },
  ],
};

// Peer-reviewed studies of NERSC's Perlmutter supercomputer.
export const STUDIES = [
  {
    id: 'li2023',
    stat: '~50%',
    statLabel: 'of GPU-enabled jobs used up to 25% of GPU memory',
    detail: null,
    authors: 'Li, Michelogiannakis, Cook, Cooray and Chen',
    title: "Analyzing Resource Utilization in an HPC System: A Case Study of NERSC's Perlmutter",
    venue: 'ISC High Performance 2023, LNCS vol. 13948, pp. 297–316',
    short: 'Li et al., ISC High Performance 2023',
    url: 'https://link.springer.com/chapter/10.1007/978-3-031-32041-5_16',
    preprint: 'https://arxiv.org/pdf/2301.05145',
  },
  {
    id: 'sencan2025',
    stat: '28.6%',
    statLabel: 'average GPU memory use across 118,276 jobs',
    detail:
      '37.12% of jobs never exceeded 15% of GPU memory (about 37% of node hours), while only 15.74% reached 75% or more.',
    authors: 'Sencan, Kulkarni, Coskun and Konate',
    title: 'Analyzing GPU Utilization in HPC Workloads: Insights from Large-Scale Systems',
    venue: "PEARC '25 (ACM)",
    short: "Sencan et al., PEARC '25",
    url: 'https://www.bu.edu/peaclab/files/2025/07/GPU_Utilization_Analysis_PEARC25.pdf',
    preprint: null,
  },
];
