// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS: the main things you'll want to change live here.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  // The company name. Change it here and it updates site-wide.
  name: 'Enkhora',

  // The web address of the live site. Change this when you get a domain
  // (for example 'https://enkhora.ai'). It's used for search engines and
  // social-share previews.
  url: 'https://enkhora.ai',

  // Shown in Google results and link previews when a page has no description of its own.
  description:
    'Serve large AI models from the GPU memory your HPC jobs leave empty. Slurm-native, open-source core, and the host job always gets its memory back first.',

  tagline: 'Your GPUs are busy. The memory inside them isn’t.',

  // Contact email. Leave it empty ('') to hide email links; the contact
  // form still works either way. Example: 'hello@enkhora.ai'
  email: '',

  // Public source-code repository for the open-source core. When set, a
  // "View on GitHub" link appears on the open-source page and in the footer.
  // Example: 'https://github.com/enkhora/enkhora'
  github: '',

  // Google Search Console verification code (see README, "Get found on Google").
  // Paste only the code inside content="...", e.g. 'abc123XYZ'. Leave '' if unused.
  googleSiteVerification: '',
};

// Links in the top menu, in order.
export const NAV = [
  { label: 'How it works', href: '/how-it-works/' },
  { label: 'Research', href: '/research/' },
  { label: 'Open source', href: '/open-source/' },
  { label: 'About', href: '/about/' },
];
