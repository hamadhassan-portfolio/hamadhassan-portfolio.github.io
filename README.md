# Hamad Hassan — Portfolio

This is a standalone, high-quality, lightweight web portfolio designed with a stark minimalist **black-and-white light aesthetic**. 

It is completely static (HTML/CSS/JS) and has **no dependencies** on any backend server, Node.js, or database. You can host it 100% free on **GitHub Pages** (your `github.io` link) or open it locally by simply double-clicking `index.html`.

---

## 📂 Folder Structure

```text
github_portfolio/
├── index.html            # Main portfolio markup & SVG fallbacks
├── css/
│   └── style.css         # Premium typography & B&W Light mode styles
├── js/
│   └── app.js            # Client-side dynamic loading, filters, & modals
├── data/
│   └── projects.json     # Copied static database containing your 17 projects
├── assets/
│   └── avatar.jpg        # Drop your profile photo here (automatically overrides SVG fallback)
└── projects/
    ├── reports/          # Folder containing placeholder PDFs (project_1_report.pdf to project_17_report.pdf)
    └── images/           # Drop your project screenshots/drawings here
```

---

## 🚀 How to Upload & Deploy to GitHub Pages

To make this website live under your `https://hamadhassan-portfolio.github.io` domain, follow these simple steps:

### Step 1: Initialize Git in this Folder
Open your terminal (PowerShell, Git Bash, or CMD), navigate to this folder, and run:
```bash
# Navigate to the portfolio folder
cd g:/portfolio/github_portfolio

# Initialize a clean repository
git init

# Add all portfolio files
git add .

# Make your initial commit
git commit -m "Initial commit of static recruiter portfolio"
```

### Step 2: Create a New Repository on GitHub
1. Go to your GitHub account and click **New Repository**.
2. Name it (e.g. `portfolio` or `hamadhassan-portfolio.github.io`).
3. Leave it public, and **do not** initialize it with a README, `.gitignore`, or license.
4. Copy the remote URL (e.g. `https://github.com/Hamad-Hassan/portfolio.git`).

### Step 3: Push the Code
In your local terminal, run the following commands (replace the URL with your copied repository link):
```bash
# Link your local folder to GitHub
git remote add origin https://github.com/Hamad-Hassan/portfolio.git

# Rename main branch
git branch -M main

# Push the files
git push -u origin main -f
```

### Step 4: Turn on GitHub Pages
1. Go to your repository settings page on GitHub.
2. Scroll down to the **Pages** tab on the left sidebar.
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Select the `main` branch and folder `/ (root)` and click **Save**.
5. Within 1-2 minutes, your website will be live at `https://<your-username>.github.io/<repo-name>/`!

---

## 🔧 Customizing Your Assets

### 1. Adding Your Profile Photo
* Simply name your professional photo `avatar.jpg` and drop it into the `assets/` folder.
* The website has a smart fallback: if `assets/avatar.jpg` is present, it will load it. If it's missing or fails, it automatically displays a clean geometric vector gear logo instead!

### 2. Replacing Project PDFs
* The website modal binds the "View Project Report PDF" button to:
  `projects/reports/project_[ID]_report.pdf`
* As you finish writeups, replace the placeholder PDFs (e.g. `project_1_report.pdf`) inside `projects/reports/` with your actual compiled reports!

### 3. Adding Project Images
* You can save screenshots of your Excel dashboards, SolidWorks CAD models, or ANSYS FEA meshes inside `projects/images/`.
* You can update `js/app.js` or `data/projects.json` to link to these images inside the modal!
