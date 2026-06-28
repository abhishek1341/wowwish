# WowWish — Commit, Push & Deploy Guide

This document describes how to ship code changes for **WowWish** from your local machine to production on **Hostinger**, using **GitHub** as the source of truth.

---

## Short answer

**Yes.** With Hostinger **Git auto-deployment** enabled, pushing to the connected branch (usually `main`) on GitHub is enough to trigger a new deployment. You do **not** need to upload files manually or SSH in for a normal release.

Hostinger will typically:

1. Detect the new commit on GitHub
2. Pull the latest code
3. Run install + build commands (as configured in hPanel)
4. Restart the app

You still should **verify the build locally** before pushing, so a broken commit does not take down production.

---

## Project references

| Item | Value |
|------|--------|
| Production site | [https://wowwish.in](https://wowwish.in) |
| GitHub repo | [https://github.com/abhishek1341/wowwish](https://github.com/abhishek1341/wowwish) |
| Deploy branch | `main` |
| Framework | Next.js 14 (App Router) |
| Package manager | npm |

---

## One-time setup (already done if you deployed before)

These only need to be confirmed once in **Hostinger hPanel**:

1. **Websites** → select **wowwish.in** → **Manage**
2. Open **Git** (or **Git Version Control**)
3. Repository connected to `abhishek1341/wowwish`
4. Branch: `main`
5. **Auto deployment** enabled
6. Build settings (typical for this project):
   - **Install command:** `npm install`
   - **Build command:** `npm run build`
   - **Start command:** `npm start` (or whatever Hostinger set for Node.js)
   - **Node.js version:** 18 or 20 recommended

If auto-deploy is on and the repo/branch match, every push to `main` triggers a new deploy.

---

## Standard release workflow

Use this every time you want to publish changes.

### 1. Open the project

```powershell
cd c:\Users\abtha\CascadeProjects\windsurf-project-3
```

### 2. Check what changed

```powershell
git status
git diff
```

Review modified files. Make sure you are not about to commit secrets (`.env`, API keys, credentials).

### 3. Run checks locally (recommended)

Catch errors before they fail on Hostinger:

```powershell
npm install
npm run type-check
npm run build
```

If `npm run build` fails, **fix it locally** — do not push yet.

Optional quick manual test:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and spot-check the pages you changed.

### 4. Stage files

Stage everything relevant:

```powershell
git add .
```

**Do not commit build cache** (optional but recommended):

```powershell
git restore --staged tsconfig.tsbuildinfo
```

Files you should **never** commit:

- `.env` / `.env.local`
- `node_modules/`
- `.next/` (build output — Hostinger builds on the server)

### 5. Commit

Use a clear message that explains *why*:

```powershell
git commit -m "Fix birthday replay scroll and default music on load."
```

Good commit message examples:

- `Fix demo CTAs and music toggle across templates`
- `Add OG preview images for social sharing`
- `Update anniversary hero copy and scroll targets`

### 6. Push to GitHub

```powershell
git push origin main
```

When this succeeds, Hostinger auto-deployment should start within a minute or two.

### 7. Watch deployment in Hostinger

1. Log in to [hPanel](https://hpanel.hostinger.com)
2. **Websites** → **wowwish.in** → **Manage**
3. Open **Git** or **Deployments**
4. Confirm the latest commit appears and status is **Success**

If it shows **Failed**, open the build log in hPanel and fix the error locally, then push again.

### 8. Verify production

After deploy succeeds:

1. Open [https://wowwish.in](https://wowwish.in)
2. Hard refresh: **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac)
3. Test the pages you changed

Suggested smoke-test URLs:

| Page | URL |
|------|-----|
| Home | `/` |
| Birthday | `/birthday` |
| Anniversary | `/anniversary` |
| Proposal | `/proposal` |
| Templates | `/templates` |

For social preview (OG image/title):

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — paste a WowWish URL and click **Scrape Again**

---

## Flow diagram

```text
Local changes
    │
    ▼
npm run type-check  ──fail──► fix locally
    │
    ▼
npm run build       ──fail──► fix locally
    │
    ▼
git add + git commit
    │
    ▼
git push origin main
    │
    ▼
GitHub (main branch updated)
    │
    ▼
Hostinger auto-deploy (pull → install → build → restart)
    │
    ▼
https://wowwish.in  (live)
```

---

## Quick copy-paste (happy path)

When you are confident the code works:

```powershell
cd c:\Users\abtha\CascadeProjects\windsurf-project-3
npm run type-check
npm run build
git add .
git restore --staged tsconfig.tsbuildinfo
git commit -m "Describe your change here."
git push origin main
```

Then check hPanel → deployment status → verify wowwish.in.

---

## When push alone is not enough

Auto-deploy covers normal code updates. You may need extra steps for:

| Situation | What to do |
|-----------|------------|
| New npm package added | Push is enough — Hostinger runs `npm install` on deploy |
| New files in `public/` (images, OG PNGs, videos) | Commit and push — `public/` is served as static assets |
| New environment variable | Add it in Hostinger hPanel (Node.js / Environment variables), then redeploy |
| DNS or domain issue | Fix in Hostinger **DNS** or **Domains**, not via Git |
| Build passes locally but fails on server | Check Node version in hPanel; read Hostinger build log |
| Site shows old content after successful deploy | Hard refresh; clear browser cache; wait 2–5 minutes for CDN |

You **do not** need to re-upload the project manually if Git auto-deploy is working.

---

## Troubleshooting

### `git push` rejected

Someone else pushed to `main`, or the remote is ahead:

```powershell
git pull origin main --rebase
git push origin main
```

### Hostinger deploy failed

1. Open the failed deployment log in hPanel
2. Find the first error (often TypeScript or `next build`)
3. Run the same command locally: `npm run build`
4. Fix, commit, push again

### Production looks unchanged

- Confirm hPanel shows the **latest commit hash** (compare with `git log -1` locally)
- Hard refresh the browser
- Try an incognito/private window
- Check you pushed to `main`, not another branch

### Music or autoplay behaves differently on production

Browsers treat autoplay differently on live HTTPS vs localhost. Test in incognito on a real phone after deploy.

### Need to redeploy without new code

In hPanel → Git → use **Redeploy** / **Deploy** on the same commit (useful after changing env vars).

---

## Branch strategy (simple)

For WowWish today:

- **`main`** = production (connected to Hostinger auto-deploy)
- Do feature work on `main` or a short-lived branch that you merge into `main` before push

Only push to `main` when you want production to update.

---

## Generating OG images (when needed)

If you add or change Open Graph images:

```powershell
npm run generate:og-images
git add public/og/
git commit -m "Regenerate OG preview images."
git push origin main
```

---

## Checklist before every release

- [ ] `npm run type-check` passes
- [ ] `npm run build` passes
- [ ] No secrets in staged files
- [ ] Commit message describes the change
- [ ] `git push origin main` succeeded
- [ ] Hostinger deployment shows **Success**
- [ ] wowwish.in verified in browser (hard refresh)
- [ ] Changed demo pages tested on mobile if UI-related

---

## Summary

| Step | Action |
|------|--------|
| 1 | Test locally (`type-check`, `build`) |
| 2 | `git add` + `git commit` |
| 3 | `git push origin main` |
| 4 | Wait for Hostinger auto-deploy |
| 5 | Verify [wowwish.in](https://wowwish.in) |

**With Hostinger Git auto-deployment on, pushing to `main` is the full deploy step** — as long as the build succeeds on the server.
