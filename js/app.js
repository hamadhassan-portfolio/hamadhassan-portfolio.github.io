// Standalone Case Book Controller
let projectsData = [];

// DOM Elements
const catalogList = document.getElementById('catalog-list');

// Map categories to modern icon representations
const CATEGORY_META = {
  maintenance: { icon: 'fa-screwdriver-wrench', label: 'Maintenance & Reliability' },
  utilities: { icon: 'fa-fire-burner', label: 'Utilities & Energy' },
  hvac: { icon: 'fa-wind', label: 'HVAC & Piping' },
  production: { icon: 'fa-compass-drafting', label: 'Production & Design' },
  quality: { icon: 'fa-shield-halved', label: 'QA/QC & Lean' },
  projectsourcing: { icon: 'fa-folder-tree', label: 'Project Sourcing' }
};

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  loadCatalogData();
});

// Load the projects and profile databases
async function loadCatalogData() {
  try {
    const [projectsRes, profileRes] = await Promise.all([
      fetch('data/projects.json'),
      fetch('data/profile.json')
    ]);

    if (!projectsRes.ok) throw new Error('Could not fetch projects catalog.');
    if (!profileRes.ok) throw new Error('Could not fetch profile database.');
    
    projectsData = await projectsRes.json();
    const profile = await profileRes.json();
    
    // Populate dynamic header and resume details from profile.json
    populateProfileData(profile);
    
    // Render list in linear dossier format
    renderCatalog();
  } catch (err) {
    console.error(err);
    catalogList.innerHTML = `
      <div style="text-align: center; color: #ef4444; padding: 40px; font-family: var(--font-mono); font-size: 0.9rem;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem; margin-bottom: 10px;"></i>
        <p>Error linking projects catalog database. Please verify projects.json and profile.json exist.</p>
      </div>
    `;
  }
}

function populateProfileData(profile) {
  if (!profile) return;

  // 1. Text elements
  if (document.getElementById('doc-name')) document.getElementById('doc-name').innerText = profile.name || "Hamad Hassan";
  if (document.getElementById('doc-title')) document.getElementById('doc-title').innerText = "Mechanical Engineer";
  
  // 2. Contact details line (Email, WhatsApp, Location, and LinkedIn)
  const contactLine = document.getElementById('doc-contact-line');
  if (contactLine) {
    contactLine.innerHTML = `
      <span><i class="fa-solid fa-envelope"></i> <a href="mailto:${profile.email}">${profile.email}</a></span>
      <span>|</span>
      <span><i class="fa-brands fa-whatsapp"></i> <a href="https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}" target="_blank">${profile.whatsapp}</a></span>
      <span>|</span>
      <span><i class="fa-solid fa-location-dot"></i> ${profile.location}</span>
      <span>|</span>
      <span><i class="fa-brands fa-linkedin"></i> <a href="https://linkedin.com/in/engr-hamadhassan" target="_blank">linkedin.com/in/engr-hamadhassan</a></span>
    `;
  }

  // 3. Portfolio link line
  const portfolioLine = document.getElementById('doc-portfolio-line');
  if (portfolioLine) {
    const cleanUrl = profile.portfolio.replace(/https?:\/\//, '').replace(/\/$/, '');
    portfolioLine.innerHTML = `
      <span>Portfolio: <strong class="blue-text">${cleanUrl}</strong></span>
      <span>|</span>
      <span>Affiliation: <strong>${profile.university}</strong> & <strong>HMC Taxila</strong></span>
    `;
  }

  // 4. Download CV button config
  const cvBtn = document.getElementById('doc-cv-btn');
  if (cvBtn) {
    const filename = `${profile.name.replace(/\s+/g, '_')}_CV.pdf`;
    cvBtn.href = `assets/${filename}`;
    cvBtn.download = filename;
    cvBtn.innerHTML = `<i class="fa-solid fa-download"></i> Download CV (PDF)`;
  }

  // 5. Abstract
  const abstract = document.getElementById('doc-abstract');
  if (abstract) {
    abstract.innerHTML = `
      <p>
        This dossier contains the compiled catalog of my <strong>17 industrial, utility, and simulation projects</strong> executed during my studies at <strong>University of Engineering and Technology, Taxila</strong> and internship at <strong>Heavy Mechanical Complex (HMC) Taxila</strong>. My capabilities cover data-driven plant reliability tracking, thermodynamic deaerator calculations, boiler utilities, HVAC cleanroom modeling, and QA/QC weld inspections under ASME/API codes.
      </p>
    `;
  }

  // 6. Technical Matrix (Skills table)
  if (document.getElementById('matrix-softwares') && profile.softwares) {
    document.getElementById('matrix-softwares').innerText = profile.softwares.join(', ');
  }
  if (document.getElementById('matrix-skills') && profile.skills) {
    document.getElementById('matrix-skills').innerText = profile.skills.join(', ');
  }
  if (document.getElementById('matrix-standards') && profile.standards) {
    document.getElementById('matrix-standards').innerText = profile.standards.join(', ');
  }
}

// Render catalog items statically in linear layout
function renderCatalog() {
  catalogList.innerHTML = '';

  if (projectsData.length === 0) {
    catalogList.innerHTML = `
      <div class="loader">
        <i class="fa-solid fa-folder-open" style="font-size: 1.8rem; margin-bottom: 8px;"></i>
        <p>No project index matches found.</p>
      </div>
    `;
    return;
  }

  projectsData.forEach((proj, idx) => {
    // Format project index number e.g. P.01
    const indexNum = String(idx + 1).padStart(2, '0');
    
    // Tools list
    const toolsArr = proj.tools.split(',').map(t => t.trim());
    const toolsText = toolsArr.join(' | ');

    const item = document.createElement('div');
    item.className = 'catalog-item';
    item.setAttribute('data-id', proj.id);

    // Dynamic Achievements bullets list
    const achievementsHtml = proj.achievements && proj.achievements.length > 0
      ? proj.achievements.map(ach => `<li>${ach.startsWith('-') ? ach.substring(1).trim() : ach.trim()}</li>`).join('')
      : `<li>Technical study and model analysis completed.</li>`;

    const catMeta = CATEGORY_META[proj.category] || { icon: 'fa-gears', label: 'Engineering' };

    item.innerHTML = `
      <!-- Project Header Row -->
      <div class="project-header-row">
        <div class="project-title-left">
          <span class="project-code">P.${indexNum}</span>
          <h3 class="project-title-text">${proj.title}</h3>
        </div>
        <span class="project-category-tag">${catMeta.label}</span>
      </div>

      <!-- Tools Row -->
      <div class="project-tools-row">
        <span>Tools & Technology: ${toolsText}</span>
      </div>

      <!-- Project Main Grid -->
      <div class="project-content-grid">
        
        <!-- Detailed Left text block -->
        <div class="content-left">
          <div class="desc-block">
            <h4 class="block-title">Summary & Objective</h4>
            <p class="project-desc-text">${proj.description}</p>
          </div>
          <div class="bullets-block">
            <h4 class="block-title">Key Deliverables & Results</h4>
            <ul class="bullets-list">
              ${achievementsHtml}
            </ul>
          </div>
        </div>

        <!-- Blueprint Media Right block -->
        <div class="content-right">
          <div class="blueprint-frame">
            <img src="projects/images/project_${proj.id}.svg" alt="${proj.title}" onerror="this.style.display='none'; document.getElementById('fallback-${proj.id}').style.display='flex';" />
            
            <div id="fallback-${proj.id}" class="blueprint-fallback" style="display: none;">
              <i class="fa-solid ${catMeta.icon}"></i>
              <span>${catMeta.label} Sketch</span>
            </div>
          </div>
          
          <div class="action-block">
            <a href="projects/reports/project_${proj.id}_report.pdf" download="Project_${proj.id}_Report.pdf" class="btn btn-primary btn-block pdf-btn">
              <i class="fa-solid fa-file-pdf"></i> Download PDF Report
            </a>
          </div>
        </div>

      </div>
    `;

    catalogList.appendChild(item);
  });
}
