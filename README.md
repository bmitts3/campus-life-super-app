**Campus Super App**

**Summary**

Small static site demonstrating a campus microsite: homepage, GPA calculator, events list, and dining menu that fetches images. The project is plain HTML/CSS/JS and uses Bootstrap 5 for layout.

**Prerequisites**

- Modern web browser (Chrome, Edge, Firefox, Safari)
- Git (optional, for cloning/pushing): https://git-scm.com/
- Node or a static host is NOT required for local testing. To serve files locally a Python install (3.x) or any simple static server is helpful. If you have Python installed, you can use it as shown below.

**Quick local preview (recommended)**

Open the site directly:

 - Double-click `index.html` or open it from your browser (`file:///`), but some features (fetch requests) work best when served over HTTP.

Serve with Python (works on Windows PowerShell):

```powershell
cd C:\Users\bmitt\webdevelopment\campus-life-super-app
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

If you prefer npm-based dev servers, install `http-server` and run:

```powershell
npm install -g http-server
http-server -c-1 . -p 8000
# open http://localhost:8000
```

**Project structure**

- `index.html` — Homepage
- `gpa.html` — Semester GPA calculator UI
- `event.html` — Events list (Bootstrap `list-group`)
- `dining.html` — Dining page with `#food-menu` where images are injected
- `css/style.css` — Custom styles (image sizing, small helpers)
- `js/script.js` — Shared JavaScript (food images + GPA calculator wiring)
- `images/` — optional local assets

**How it works**

- `js/script.js` fetches images from the Foodish API and inserts them into `#food-menu`. The markup uses Bootstrap grid classes so images reflow across screen sizes.
- The GPA calculator is entirely client-side and calculates weighted GPA using the values entered in the table.

**Recommended workflow**

1. Clone the repo:

```powershell
git clone https://github.com/bmitts3/campus-life-super-app.git
cd campus-life-super-app
```

2. Serve locally as above and test pages in your browser.

3. Make edits (HTML/CSS/JS) and refresh the page to see changes.

4. Commit and push changes:

```powershell
git add .
git commit -m "Update site"
git push origin main
```

**Deployment options**

These are static pages so any static-hosting provider works. Below are quick steps for common providers.

- GitHub Pages (root or `docs/`):

  1. From the repository on GitHub go to Settings → Pages.
  2. Choose branch `main` and folder `/ (root)` or `/docs` and Save.
  3. After a minute your site will be available at `https://<your-username>.github.io/<repo>/`.

- Netlify (drag-and-drop or connected repo):

  1. Sign in to Netlify and click "New site from Git" (connect GitHub).
  2. Select this repository, set the build command empty (no build) and publish directory `.` (root) or `./`.
  3. Deploy — Netlify will publish a URL for you.

- Vercel (recommended for Git integration):

  1. Sign in to Vercel and import the Git repository.
  2. No build command is required; set Output Directory to `/`.
  3. Deploy and Vercel will provide a preview + production URL.

**Environment / CORS note**

The Foodish API is public but can behave differently (JSON or redirects). If images do not load when opening the pages directly with `file:///`, serve the files over HTTP (see preview step). If you deploy to GitHub Pages or Netlify, the hosted site will normally work.

**Troubleshooting**

- Images not appearing: ensure you are serving the site over HTTP (see Python server) or check browser console for fetch errors.
- Bootstrap not applying: confirm the CDN link in `<head>` is present and you have internet access.
- JavaScript errors: open the browser Developer Tools Console to inspect stack traces.

**Optional improvements**

- Make the navigation ribbon sticky: add a small CSS rule to `css/style.css`:

```css
.top-ribbon { position: sticky; top: 0; z-index: 1000; }
body { padding-top: 56px; /* adjust if ribbon height changes */ }
```

- Add unit tests or a basic CI workflow (GitHub Actions) to run an HTML linter on push.

**Contact / contributions**

Feel free to open issues or PRs on the repository for improvements, bug fixes, or deployment automation.

---

*Created for local development and simple static deployment.*
