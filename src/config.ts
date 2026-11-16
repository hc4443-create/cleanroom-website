// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS: the main things you'll want to change live here.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Cleanroom',

  // The web address of the live site. Change this when you get a domain
  // (for example 'https://cleanroom.ai'). It's used for search engines and
  // social-share previews.
  url: 'https://enkhora.ai',

  // Shown in Google results and link previews when a page has no description of its own.
  description:
    'Cleanroom lets universities and research institutions run private AI on the GPU clusters they already own. No new hardware, no per-use cloud bills, and data stays on campus.',

  tagline: 'Private AI on the GPU clusters you already own.',

  // Contact email. Leave it empty ('') to hide email links; the contact
  // form still works either way. Example: 'hello@cleanroom.ai'
  email: '',

  // Google Search Console verification code (see README, "Get found on Google").
  // Paste only the code inside content="...", e.g. 'abc123XYZ'. Leave '' if unused.
  googleSiteVerification: '',
};

// Links in the top menu, in order.
export const NAV = [
  { label: 'How it works', href: '/how-it-works/' },
  { label: 'Evidence', href: '/research/' },
  { label: 'For institutions', href: '/institutions/' },
  { label: 'About', href: '/about/' },
];
