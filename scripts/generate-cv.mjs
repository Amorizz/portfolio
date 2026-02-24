#!/usr/bin/env node

/**
 * Generates personalized LaTeX CVs from JSON data and compiles to PDF.
 * The output matches the online HTML CV: two-column layout, dark sidebar,
 * circular photo, exact colors, icons, spacing, and structure.
 *
 * Usage:
 *   node scripts/generate-cv.mjs          # Generate both EN and FR
 *   node scripts/generate-cv.mjs en       # English only
 *   node scripts/generate-cv.mjs fr       # French only
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

// ─── LaTeX character escaping ────────────────────────────────────────────────

function tex(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

// ─── Date formatting ─────────────────────────────────────────────────────────

function formatDate(dateStr, lang) {
  if (!dateStr) return lang === 'fr' ? 'Présent' : 'Present';
  const d = new Date(dateStr);
  if (lang === 'fr') {
    const months = ['Janv.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin',
      'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
    'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

// ─── Translations ────────────────────────────────────────────────────────────

const translations = {
  en: {
    contact: 'Contact',
    skills: 'Skills',
    languages: 'Languages',
    interests: 'Interests',
    certifications: 'Certifications',
    profile: 'Profile',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    present: 'Present',
    availability: 'Available for 6-month internship --- September 2026 --- National \\& international mobility --- Driving license',
  },
  fr: {
    contact: 'Contact',
    skills: 'Compétences',
    languages: 'Langues',
    interests: 'Intérêts',
    certifications: 'Certifications',
    profile: 'Profil',
    experience: 'Expérience',
    education: 'Formation',
    projects: 'Projets',
    present: 'Présent',
    availability: 'Disponible pour stage de 6 mois --- Septembre 2026 --- Mobilité nationale et internationale --- Permis B',
  },
};

// ─── LaTeX document generator ────────────────────────────────────────────────

function generateLatex(cvData, lang, avatarAbsPath) {
  const t = translations[lang];
  const info = cvData.personalInfo;
  const babelLang = lang === 'fr' ? 'french' : 'english';
  const avatarPath = avatarAbsPath.replace(/\\/g, '/');

  // ── Contact rows (icon + text) ─────────────────────────────────────────────

  const contactRows = [
    `\\contactrow{\\iconEnvelope}{\\href{mailto:${info.email}}{${tex(info.email)}}}`,
    `\\contactrow{\\iconPin}{${tex(info.location)}}`,
    `\\contactrow{\\iconGlobe}{\\href{${info.website}}{amaury-dufrenot.com}}`,
    `\\contactrow{\\iconLinkedin}{\\href{${info.linkedin}}{/amaury-dufrenot}}`,
    `\\contactrow{\\iconGithub}{\\href{${info.github}}{/Amorizz}}`,
  ].join('\n');

  // ── Skills (grouped by category) ───────────────────────────────────────────

  const skillBlocks = cvData.skills.technical.map((cat) => {
    const names = cat.skills.map((s) => tex(s.name)).join(', ');
    return `{\\fontsize{7.5}{9.5}\\selectfont\\bfseries\\color{white}${tex(cat.category)}}\\\\[0.5pt]
{\\fontsize{7}{9}\\selectfont\\color{sidebarmuted}${names}}\\\\[3pt]`;
  }).join('\n');

  // ── Languages ──────────────────────────────────────────────────────────────

  const langRows = info.languages.map((l) => {
    return `\\langrow{${tex(l.name)}}{${tex(l.level)}}`;
  }).join('\n');

  // ── Certifications ─────────────────────────────────────────────────────────

  const certBlocks = cvData.certifications.map((c) => {
    return `{\\fontsize{7}{9}\\selectfont\\bfseries\\color{white}${tex(c.name)}}\\\\[0pt]
{\\fontsize{7}{9}\\selectfont\\color{sidebarmuted}${tex(c.issuer)} — ${tex(c.status)}}\\\\[2pt]`;
  }).join('\n');

  // ── Interests ──────────────────────────────────────────────────────────────

  const interestLines = cvData.interests.map((i) => {
    return `{\\fontsize{7}{9}\\selectfont\\color{sidebarmuted}${tex(i.name)}}\\\\[1pt]`;
  }).join('\n');

  // ── Experience entries ─────────────────────────────────────────────────────

  const expEntries = cvData.experience.map((exp) => {
    const end = exp.current ? t.present : formatDate(exp.endDate, lang);
    const dateStr = `${formatDate(exp.startDate, lang)} – ${end}`;

    let bullets = '';
    if (exp.description) {
      bullets += `{\\fontsize{7}{9.5}\\selectfont\\color{bodytext}${tex(exp.description)}}\\\\[1pt]\n`;
    }
    if (exp.achievements && exp.achievements.length > 0) {
      const items = exp.achievements.map((a) =>
        `  \\item ${tex(a)}`
      ).join('\n');
      bullets += `\\begin{itemize}[leftmargin=2.5mm, itemsep=0pt, parsep=0pt, topsep=1pt]
  \\fontsize{7}{9.5}\\selectfont\\color{bodytext}
${items}
\\end{itemize}\n`;
    }

    let techLine = '';
    if (exp.technologies && exp.technologies.length > 0) {
      techLine = `{\\fontsize{6.5}{8}\\selectfont\\color{mutedtext}${tex(exp.technologies.join(' · '))}}\\\\[0pt]\n`;
    }

    return `\\vspace{1pt}
{\\fontsize{8}{10}\\selectfont\\bfseries\\color{titletext}${tex(exp.position)}}\\hfill{\\fontsize{7}{9}\\selectfont\\color{mutedtext}${dateStr}}\\\\[0.5pt]
{\\fontsize{7.5}{9}\\selectfont\\bfseries\\color{companytext}${tex(exp.company)}}\\\\[0.5pt]
${bullets}${techLine}`;
  }).join('\n');

  // ── Project entries ────────────────────────────────────────────────────────

  const projEntries = cvData.projects.map((proj) => {
    const end = proj.current ? t.present : formatDate(proj.endDate, lang);
    const dateStr = `${formatDate(proj.startDate, lang)} – ${end}`;
    const roleStr = proj.role ? ` {\\fontsize{7}{9}\\selectfont\\mdseries\\color{mutedtext}— ${tex(proj.role)}}` : '';

    return `\\vspace{1pt}
{\\fontsize{8}{10}\\selectfont\\bfseries\\color{titletext}${tex(proj.name)}}${roleStr}\\hfill{\\fontsize{7}{9}\\selectfont\\color{mutedtext}${dateStr}}\\\\[0.5pt]
{\\fontsize{7}{9.5}\\selectfont\\color{bodytext}${tex(proj.shortDescription)}}\\\\[0.5pt]
{\\fontsize{6.5}{8}\\selectfont\\color{mutedtext}${tex(proj.technologies.join(' · '))}}\\\\[0pt]`;
  }).join('\n');

  // ── Education entries ──────────────────────────────────────────────────────

  const eduEntries = cvData.education.map((edu) => {
    const end = edu.current ? t.present : formatDate(edu.endDate, lang);
    const dateStr = `${formatDate(edu.startDate, lang)} – ${end}`;

    let extra = '';
    if (edu.specialization) {
      extra += `{\\fontsize{7}{9.5}\\selectfont\\color{bodytext}${tex(edu.specialization)}}\\\\[0.5pt]\n`;
    }
    if (edu.achievements && edu.achievements.length > 0) {
      const items = edu.achievements.map((a) =>
        `  \\item ${tex(a)}`
      ).join('\n');
      extra += `\\begin{itemize}[leftmargin=2.5mm, itemsep=0pt, parsep=0pt, topsep=1pt]
  \\fontsize{7}{9.5}\\selectfont\\color{bodytext}
${items}
\\end{itemize}\n`;
    }

    return `\\vspace{1pt}
{\\fontsize{8}{10}\\selectfont\\bfseries\\color{titletext}${tex(edu.degree)}}\\hfill{\\fontsize{7}{9}\\selectfont\\color{mutedtext}${dateStr}}\\\\[0.5pt]
{\\fontsize{7.5}{9}\\selectfont\\bfseries\\color{companytext}${tex(edu.institution)} — ${tex(edu.location)}}\\\\[0.5pt]
${extra}`;
  }).join('\n');

  // ── Assemble full document ─────────────────────────────────────────────────

  return `%% CV — ${info.fullName}
%% Generated from portfolio JSON data — matches online HTML design
%% Two-column layout with sidebar, photo, colors, and icons

\\documentclass[a4paper, 10pt]{article}
\\usepackage[top=0mm, bottom=0mm, left=0mm, right=0mm]{geometry}
\\usepackage{xcolor}
\\usepackage{tikz}
\\usepackage{graphicx}
\\usepackage[hidelinks]{hyperref}
\\usepackage{enumitem}
\\usepackage[absolute,overlay]{textpos}
\\usepackage[${babelLang}]{babel}
\\usepackage[T1]{fontenc}
\\usepackage[sfdefault]{inter}
\\usepackage{raleway}

\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}
\\setlength{\\TPHorizModule}{1mm}
\\setlength{\\TPVertModule}{1mm}

% Heading font (Raleway ≈ Space Grotesk from online version)
\\newcommand{\\headingfont}{\\fontfamily{Raleway-TLF}\\selectfont}

% Better line breaking for narrow columns
\\tolerance=200
\\emergencystretch=2em

% ─── Colors (matching HTML exactly) ──────────────────────────────────────────
\\definecolor{sidebarbg}{HTML}{1E2211}
\\definecolor{sidebartext}{HTML}{E8ECD8}
\\definecolor{sidebarmuted}{HTML}{CDD4B8}
\\definecolor{sidebartitle}{HTML}{EECAAA}
\\definecolor{sidebartitlerule}{HTML}{3A372A}
\\definecolor{accent}{HTML}{B5651D}
\\definecolor{mainbg}{HTML}{FFFFFF}
\\definecolor{titletext}{HTML}{111827}
\\definecolor{bodytext}{HTML}{374151}
\\definecolor{mutedtext}{HTML}{6B7280}
\\definecolor{companytext}{HTML}{92400E}
\\definecolor{sectionborder}{HTML}{E5E7EB}

% ─── Dimensions ──────────────────────────────────────────────────────────────
\\newlength{\\sidebarwidth}\\setlength{\\sidebarwidth}{71.4mm}
\\newlength{\\mainwidth}\\setlength{\\mainwidth}{138.6mm}
\\newlength{\\sidepad}\\setlength{\\sidepad}{6mm}
\\newlength{\\mainpad}\\setlength{\\mainpad}{7mm}
\\newlength{\\sideinner}\\setlength{\\sideinner}{59.4mm}   % 71.4 - 2*6
\\newlength{\\maininner}\\setlength{\\maininner}{124.6mm}  % 138.6 - 2*7

% ─── Sidebar section title ───────────────────────────────────────────────────
\\newcommand{\\sidebarsection}[1]{%
  \\vspace{3mm}%
  {\\headingfont\\fontsize{8}{10}\\selectfont\\bfseries\\color{sidebartitle}\\MakeUppercase{#1}}\\\\[-1pt]%
  {\\color{sidebartitlerule}\\rule{\\sideinner}{0.3pt}}\\\\[2pt]%
}

% ─── TikZ icons (uniform 1×1 box, consistent alignment) ──────────────────
\\newcommand{\\iconEnvelope}{%
  \\begin{tikzpicture}[baseline=-0.6ex, x=2.8mm, y=2.8mm, line cap=round, line join=round]
    \\useasboundingbox (0,0) rectangle (1,1);
    \\draw[accent, thick] (0.05,0.15) rectangle (0.95,0.85);
    \\draw[accent, thick] (0.05,0.85) -- (0.5,0.42) -- (0.95,0.85);
  \\end{tikzpicture}%
}
\\newcommand{\\iconPin}{%
  \\begin{tikzpicture}[baseline=-0.6ex, x=2.8mm, y=2.8mm, line cap=round]
    \\useasboundingbox (0,0) rectangle (1,1);
    \\fill[accent] (0.5,0.68) circle (0.22);
    \\fill[accent] (0.32,0.55) -- (0.5,0.15) -- (0.68,0.55) -- cycle;
  \\end{tikzpicture}%
}
\\newcommand{\\iconGlobe}{%
  \\begin{tikzpicture}[baseline=-0.6ex, x=2.8mm, y=2.8mm, line cap=round]
    \\useasboundingbox (0,0) rectangle (1,1);
    \\draw[accent, thick] (0.5,0.5) circle (0.42);
    \\draw[accent] (0.08,0.5) -- (0.92,0.5);
    \\draw[accent] (0.5,0.08) -- (0.5,0.92);
    \\draw[accent] (0.2,0.18) .. controls (0.5,0.32) .. (0.8,0.18);
    \\draw[accent] (0.2,0.82) .. controls (0.5,0.68) .. (0.8,0.82);
  \\end{tikzpicture}%
}
\\newcommand{\\iconLinkedin}{%
  \\begin{tikzpicture}[baseline=-0.6ex, x=2.8mm, y=2.8mm, line cap=round]
    \\useasboundingbox (0,0) rectangle (1,1);
    \\draw[accent, thick, rounded corners=0.06cm] (0.08,0.08) rectangle (0.92,0.92);
    \\node[accent, font=\\fontsize{4}{4}\\selectfont\\bfseries] at (0.5,0.47) {in};
  \\end{tikzpicture}%
}
\\newcommand{\\iconGithub}{%
  \\begin{tikzpicture}[baseline=-0.6ex, x=2.8mm, y=2.8mm, line cap=round]
    \\useasboundingbox (0,0) rectangle (1,1);
    \\draw[accent, thick] (0.5,0.5) circle (0.42);
    \\fill[accent] (0.5,0.68) circle (0.09);
    \\draw[accent, thick] (0.5,0.59) -- (0.5,0.32);
    \\draw[accent] (0.5,0.42) -- (0.3,0.24);
    \\draw[accent] (0.5,0.42) -- (0.7,0.24);
  \\end{tikzpicture}%
}

% ─── Contact row (icon in fixed-width box + text) ────────────────────────────
\\newcommand{\\contactrow}[2]{%
  \\vspace{1.5pt}%
  \\makebox[3.5mm][c]{#1}\\hspace{1mm}%
  {\\fontsize{7.5}{10}\\selectfont\\color{sidebartext}#2}\\\\[0pt]%
}

% ─── Language row (name left, level right) ───────────────────────────────────
\\newcommand{\\langrow}[2]{%
  {\\fontsize{7.5}{10}\\selectfont\\color{sidebartext}#1\\hfill\\color{sidebarmuted}#2}\\\\[1pt]%
}

% ─── Main section title ─────────────────────────────────────────────────────
\\newcommand{\\mainsection}[1]{%
  \\vspace{1.8mm}%
  {\\color{sectionborder}\\rule{\\maininner}{0.3pt}}\\\\[2pt]%
  {\\headingfont\\fontsize{8.5}{10}\\selectfont\\bfseries\\color{titletext}\\MakeUppercase{#1}}\\\\[1.5pt]%
}

% ─────────────────────────────────────────────────────────────────────────────

\\begin{document}

% ─── Sidebar background (full-page overlay) ──────────────────────────────────
\\begin{tikzpicture}[remember picture, overlay]
  \\fill[sidebarbg] (current page.north west) rectangle ([xshift=\\sidebarwidth]current page.south west);
\\end{tikzpicture}

% ═══════════════════════════════════════════════════════════════════════════════
% LEFT SIDEBAR (absolute position)
% ═══════════════════════════════════════════════════════════════════════════════
\\begin{textblock*}{\\sideinner}(\\sidepad,\\sidepad)
\\raggedright\\color{sidebartext}

% ── Photo ─────────────────────────────────────────────────────────────────
\\begin{center}
\\begin{tikzpicture}
  \\clip (0,0) circle (18mm);
  \\node at (0,0) {\\includegraphics[width=36mm]{${avatarPath}}};
  \\draw[accent, line width=0.8mm] (0,0) circle (18mm);
\\end{tikzpicture}
\\end{center}

% ── Contact ───────────────────────────────────────────────────────────────
\\sidebarsection{${t.contact}}
${contactRows}

% ── Skills ────────────────────────────────────────────────────────────────
\\sidebarsection{${t.skills}}
${skillBlocks}

% ── Languages ─────────────────────────────────────────────────────────────
\\sidebarsection{${t.languages}}
${langRows}

% ── Certifications ────────────────────────────────────────────────────────
\\sidebarsection{${t.certifications}}
${certBlocks}

% ── Interests ─────────────────────────────────────────────────────────────
\\sidebarsection{${t.interests}}
${interestLines}

\\end{textblock*}

% ═══════════════════════════════════════════════════════════════════════════════
% RIGHT MAIN CONTENT (absolute position)
% ═══════════════════════════════════════════════════════════════════════════════
\\begin{textblock*}{\\maininner}(78.4mm,\\mainpad)
\\raggedright

% ── Header ──────────────────────────────────────────────────────────────────
{\\headingfont\\fontsize{18}{22}\\selectfont\\bfseries\\color{titletext}${tex(info.fullName)}}\\\\[1pt]
{\\fontsize{9}{11}\\selectfont\\bfseries\\color{companytext}${tex(info.title)}}\\\\[3pt]
{\\color{accent}\\rule{\\maininner}{0.6pt}}

% ── Profile ───────────────────────────────────────────────────────────────
\\mainsection{${t.profile}}
{\\fontsize{7.5}{10.5}\\selectfont\\color{bodytext}${tex(cvData.professionalSummary)}}

% ── Experience ────────────────────────────────────────────────────────────
\\mainsection{${t.experience}}
${expEntries}

% ── Projects ──────────────────────────────────────────────────────────────
\\mainsection{${t.projects}}
${projEntries}

% ── Education ─────────────────────────────────────────────────────────────
\\mainsection{${t.education}}
${eduEntries}

\\end{textblock*}

% ═══════════════════════════════════════════════════════════════════════════════
% FOOTER (absolute position, pinned to bottom)
% ═══════════════════════════════════════════════════════════════════════════════
\\begin{textblock*}{\\maininner}(78.4mm,289mm)
{\\color{sectionborder}\\rule{\\maininner}{0.3pt}}\\\\[2pt]
{\\centering\\fontsize{6.5}{8}\\selectfont\\color{mutedtext}${t.availability}\\\\}
\\end{textblock*}

\\end{document}
`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const requestedLang = args[0];
  const langs = requestedLang ? [requestedLang] : ['en', 'fr'];

  const outDir = resolve(ROOT, 'public', 'cv');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const texDir = resolve(ROOT, 'cv-output');
  if (!existsSync(texDir)) mkdirSync(texDir, { recursive: true });

  const avatarSrc = resolve(ROOT, 'public', 'images', 'IMG_3840.png');
  if (!existsSync(avatarSrc)) {
    console.error(`Avatar image not found: ${avatarSrc}`);
    process.exit(1);
  }

  const avatarDest = resolve(texDir, 'avatar.png');
  copyFileSync(avatarSrc, avatarDest);

  for (const lang of langs) {
    console.log(`\n--- Generating ${lang.toUpperCase()} CV ---`);

    const dataPath = resolve(ROOT, 'data', lang, 'cv.json');
    if (!existsSync(dataPath)) {
      console.error(`  Data file not found: ${dataPath}`);
      continue;
    }

    const cvData = JSON.parse(readFileSync(dataPath, 'utf-8'));
    const latexContent = generateLatex(cvData, lang, avatarDest);

    const texPath = resolve(texDir, `cv-${lang}.tex`);
    writeFileSync(texPath, latexContent, 'utf-8');
    console.log(`  .tex saved: ${texPath}`);

    try {
      const { compile } = await import('node-latex-compiler');

      console.log(`  Compiling to PDF (Tectonic)...`);
      const result = await compile({
        texFile: texPath,
        outputDir: outDir,
        onStdout: (data) => {
          const trimmed = data.trim();
          if (trimmed) console.log(`  [tectonic] ${trimmed}`);
        },
        onStderr: (data) => {
          const trimmed = data.trim();
          if (trimmed) console.log(`  [tectonic] ${trimmed}`);
        },
      });

      if (result.status === 'success') {
        console.log(`  PDF generated: ${result.pdfPath}`);
      } else {
        console.error(`  Compilation failed: ${result.error || result.stderr}`);
        console.log(`  .tex file is still available at: ${texPath}`);
      }
    } catch (err) {
      console.error(`  node-latex-compiler error: ${err.message}`);
      console.log(`  .tex file is still available at: ${texPath}`);
    }
  }

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
