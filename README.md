# Game Night Website

Christian Singles Game Night Check-In Website

**Live Site:** https://achristiangamenight-cell.github.io/GameNight/

## Push to GitHub

If this is a new repo or you're pushing "New Game Night" for the first time:

```bash
cd "Oct25thGameNight"
git init
git add .
git commit -m "Game Night site: comments, discussion tabs, Firebase-ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If the repo already exists and you're just updating:

```bash
cd "Oct25thGameNight"
git add .
git commit -m "Ready for GitHub: discussion tabs, search, ranking, optional nickname"
git push
```

**Note:** Do not commit real Firebase API keys. Keep `FIREBASE_ENABLED = false` and placeholder values in `firebase-config.js` in the repo; use environment or deploy secrets for production keys if needed.

## Setup

1. Install dependencies:
```bash
npm install
```

## Development

### Start Local Server
```bash
npm start
```
This will start a local server on http://localhost:8000 and open it in your browser.

### Auto-Sync to GitHub & GitHub Pages
```bash
npm run watch
```
or
```bash
npm run dev
```

This will:
- Watch for changes in HTML, CSS, JS, and JSON files
- Automatically commit changes after 2 seconds of inactivity
- Automatically push to GitHub
- **Automatically deploy to GitHub Pages** (via GitHub Actions)
- Display status messages in the console

The watcher will:
- ✅ Auto-commit when you save files
- ✅ Auto-push to GitHub
- ✅ Trigger GitHub Pages deployment
- ✅ Show which files changed
- ✅ Handle errors gracefully

**Deployment Flow:**
1. You save a file → Watcher detects change
2. After 2 seconds → Auto-commits and pushes to GitHub
3. GitHub Actions → Automatically deploys to GitHub Pages
4. Your site updates → https://achristiangamenight-cell.github.io/GameNight/

**Note:** GitHub Pages deployment usually takes 1-2 minutes after push.

### Manual Commands

To manually commit and push:
```bash
git add -A
git commit -m "Your message"
git push origin master
```

## GitHub Pages Setup

The repository is configured with GitHub Actions to automatically deploy to GitHub Pages.

**If GitHub Pages is not enabled:**
1. Go to repository Settings → Pages
2. Source: Select "GitHub Actions"
3. The workflow will automatically deploy on each push

## Features

- Custom styled forms
- Google Apps Script integration
- Responsive design
- Anonymous comments / questions (optional nickname; Google & Apple sign-in to claim a nickname)
- Discussion list: search, sort by Recent / Recent commented on / Highest ranking, rate 1–5, pagination (5 per page)
- Feedback form with ratings
- Firebase (optional): see `COMMENT_FIREBASE_SETUP.md` for Auth + Firestore
- Automatic GitHub Pages deployment
