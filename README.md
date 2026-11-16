# Enkhora website

The Enkhora website, built with [Astro](https://astro.build): a tool that turns
simple files into a fast, plain HTML website.

---

## 1. One-time setup: install Node.js

Astro needs a free program called **Node.js**.

1. Go to **https://nodejs.org** and download the **LTS** version for macOS (the `.pkg` file).
2. Open the downloaded file and click through the installer. It will ask for your Mac password.
3. Check that it worked. Open the **Terminal** app and run:

   ```bash
   node --version
   ```

   You should see something like `v22.x.x`.

## 2. Preview the site on your computer

In Terminal, go to the website folder:

```bash
cd ~/Documents/Startup/website
```

The first time only, download the building blocks (this takes about a minute):

```bash
npm install
```

Then start the preview:

```bash
npm run dev
```

Open **http://localhost:4321** in your browser. Leave Terminal running: every time you
save a file, the browser updates automatically. Press `Ctrl + C` in Terminal to stop.

> The contact form only works on the live (Netlify) site, not in
> the local preview. That's expected.

---

## 3. Where to edit things

| I want to change… | Edit this file |
|---|---|
| Company name, contact email, site address, tagline, GitHub link | `src/config.ts` |
| Menu links | `src/config.ts` (`NAV`) |
| Team names, bios, photos | `src/data/team.ts` |
| Research numbers and citations | `src/data/research.ts` |
| Home page text | `src/pages/index.astro` |
| How it works page | `src/pages/how-it-works.astro` |
| Research page | `src/pages/research.astro` |
| Open source page | `src/pages/open-source.astro` |
| About page | `src/pages/about.astro` |
| Contact page | `src/pages/contact.astro` |
| Colors, fonts, spacing (whole site) | `src/styles/global.css` (top of file) |
| Social-share image | `scripts/og-image.svg`, then run `npm run og` |

In `.astro` files, the text between tags is safe to edit, for example
`<h1>Your headline here</h1>`. Avoid changing the parts inside `{ }` or between the
`---` lines at the top unless you know what they do.

### Adding a team photo
1. Put a square photo in `public/team/`, e.g. `public/team/hugo.jpg`.
2. In `src/data/team.ts`, set `photo: '/team/hugo.jpg'`.

### Posting an update (news)
1. Copy `src/content/updates/_example-post.md` and rename it, e.g. `2027-01-first-pilot.md`.
2. Edit the title, date, summary and text, and set `draft: false`.
3. An **Updates** link appears in the menu automatically once the first post is published.

### When you get a domain
1. In `src/config.ts`, change `url` to your domain (e.g. `'https://cleanroom.ai'`).
2. In `public/robots.txt`, change the `Sitemap:` line to match.
3. Add the domain in Netlify (**Domain management → Add a domain**).

---

## 4. Put the site online (one-time setup)

The setup: your files live on **GitHub** (free storage for code), and **Netlify** (free hosting)
watches GitHub. Every time you save a change to GitHub, Netlify updates the live site within a couple of minutes.

### Step A: Put the files on GitHub
1. Create a free account at **https://github.com**.
2. Download **GitHub Desktop** from **https://desktop.github.com** and sign in with your GitHub account.
3. In GitHub Desktop: **File → Add Local Repository…** → choose the `website` folder.
   It will say this isn't a repository yet. Click **create a repository**, keep the name
   `cleanroom-website`, and click **Create Repository**.
4. Click **Publish repository** (top right). You can leave **Keep this code private** checked; Netlify still works.

### Step B: Connect Netlify
1. Go to **https://app.netlify.com** and sign up with **"Sign up with GitHub"**.
2. Click **Add new site → Import an existing project → GitHub**, allow access, and pick `cleanroom-website`.
3. Netlify reads the settings from `netlify.toml`, so you don't need to change anything. Click **Deploy**.
4. When it finishes, your site is live at a random address like `jolly-otter-123.netlify.app`.
5. Rename it: **Site configuration → Change site name** → type `cleanroom` (or another name if it's taken).
   **If you use a name other than `cleanroom`**, update `url` in `src/config.ts` and the `Sitemap:` line in
   `public/robots.txt` to match, then publish that change (see section 5).

### Step C: Turn on the forms
1. In Netlify, open **Forms** and click **Enable form detection**.
2. Trigger a fresh deploy: **Deploys → Trigger deploy → Deploy site**.
3. To get an email for each submission: **Site configuration → Notifications → Emails and webhooks →
   Form submission notifications → Add notification → Email notification**, then pick the `contact` form.
4. Messages appear under **Forms → contact**, where you can also export them.
5. Test it: send yourself a message through the live contact form.

### Step D: Get found on Google
Google discovers new sites on its own eventually, but this makes it faster (usually a few days to a few weeks).
1. Go to **https://search.google.com/search-console** and sign in with a Google account.
2. Choose **URL prefix** and enter your site address, e.g. `https://enkhora.ai`.
3. Choose the **HTML tag** verification method. Google shows something like
   `<meta name="google-site-verification" content="abc123XYZ" />`.
4. Copy only the code (`abc123XYZ`) into `googleSiteVerification` in `src/config.ts`, publish the change
   (section 5), wait about 2 minutes, then click **Verify** in Search Console.
5. In Search Console, open **Sitemaps**, enter `sitemap-index.xml`, and click **Submit**.
6. Optionally, use **URL inspection** on your home page and click **Request indexing**.

At first you're more likely to find the site by searching something specific, like
`Enkhora GPU memory inference`. A custom domain and links to the site
(LinkedIn, your accelerator profile) help it rank higher over time.

---

## 5. Editing the site later

**Option 1: in your browser (best for small text fixes)**
1. Go to your repository on github.com and open the file (see the table in section 3).
2. Click the **pencil icon**, edit the text, and click **Commit changes**.
3. The live site updates in about 1–2 minutes. Check progress under **Deploys** in Netlify.

**Option 2: on your computer (best for bigger changes, since you can preview first)**
1. Edit files in a text editor, such as **VS Code** (free, https://code.visualstudio.com).
2. Preview with `npm run dev` (section 2).
3. When it looks right, open GitHub Desktop, write a short summary (e.g. "Update team bios"),
   click **Commit to main**, then **Push origin**. The live site updates in a couple of minutes.

If you use both options, click **Fetch origin / Pull** in GitHub Desktop before editing on your
computer, so you start from the latest version.

If a deploy fails, Netlify keeps the previous version live, so a broken edit never takes the site down.
Open the failed deploy in Netlify to read the error.

### Bringing back the mailing-list signup
The signup form was removed for now but is kept in `src/components/NewsletterForm.astro`.
To show it again, add `<NewsletterForm id="footer" dark />` back to `src/components/Footer.astro`
(and import it at the top), and recreate a "subscribed" thank-you page (or ask Claude to).
Signups would then appear in Netlify under **Forms → updates**. Remember that you'd need to email
subscribers yourself, ideally through a newsletter tool that handles unsubscribes.

## 6. Check before publishing

```bash
npm run build
```

This builds the final site into a `dist` folder and reports any errors.
