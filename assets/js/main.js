// main.js
import { skills } from './data/skills.js';
import { experience } from './data/experience.js';
import { education } from './data/education.js';
import { contact } from './data/contact.js';

document.addEventListener('DOMContentLoaded', () => {
    renderAllSkills();
    renderExperienceTimeline();
    renderEducationTimeline();
    renderContactCards();
});

/* ==========================================================================
   1. SKILLS RENDERING PIPELINE
   ========================================================================== */
function createSkillChip(skillName, hoverBorderClass, hoverTextClass) {
    return `
        <span class="text-xs bg-zinc-900 text-zinc-400 px-2.5 py-1 rounded-md border border-zinc-800 transition-colors duration-200 hover:${hoverBorderClass} hover:${hoverTextClass}">
            ${skillName}
        </span>
    `;
}

const skillMap = {
    frontend: { id: 'frontend-skills', border: 'border-purple-500/30', text: 'text-purple-300' },
    backend: { id: 'backend-skills', border: 'border-blue-500/30', text: 'text-blue-300' },
    data: { id: 'datascience-skills', border: 'border-green-500/30', text: 'text-green-300' },
    math: { id: 'math-skills', border: 'border-yellow-500/30', text: 'text-yellow-300' },
    cloud: { id: 'cloud-skills', border: 'border-cyan-500/30', text: 'text-cyan-300' },
    engineering: { id: 'engineering-skills', border: 'border-rose-500/30', text: 'text-rose-300' }
};

function renderAllSkills() {
    Object.keys(skillMap).forEach(key => {
        const container = document.getElementById(skillMap[key].id);
        const skillList = skills[key];

        if (container && skillList) {
            container.innerHTML = skillList
                .map(skillName => createSkillChip(skillName, skillMap[key].border, skillMap[key].text))
                .join('');
        }
    });
}

/* ==========================================================================
   2. EXPERIENCE TIMELINE RENDERING PIPELINE
   ========================================================================== */
function renderExperienceTimeline() {
    const timelineContainer = document.getElementById('experience-timeline');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = experience.map(job => {
        const bulletsHTML = job.bulletpoints
            .map(bullet => `<li>${bullet}</li>`)
            .join('');

        return `
            <div class="relative pl-10 sm:pl-16 group">
                <div class="absolute left-4 sm:left-8 top-2.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-yellow-500 group-hover:bg-yellow-500 group-hover:scale-125 transition-all duration-300 shadow-md shadow-yellow-500/10"></div>

                <div class="bg-zinc-900/30 backdrop-blur-xs border border-zinc-800/80 hover:border-yellow-500/40 rounded-xl p-5 shadow-lg hover:shadow-yellow-500/5 transition-all duration-300">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                        <div>
                            <h3 class="text-base sm:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-200">${job.title}</h3>
                            <p class="text-xs sm:text-sm text-zinc-400 font-medium">${job.name}</p>
                        </div>
                        <span class="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/10 self-start mt-1 sm:mt-0 whitespace-nowrap">
                            ${job.date}
                        </span>
                    </div>

                    <p class="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">${job.description}</p>

                    <ul class="mt-2.5 space-y-1.5 text-xs sm:text-sm text-zinc-400 list-disc list-inside marker:text-yellow-500/70 pl-1">
                        ${bulletsHTML}
                    </ul>
                </div>
            </div>
        `;
    }).join('');
}

/* ==========================================================================
   3. EDUCATION TIMELINE RENDERING PIPELINE (AUTOMATED STATUSES)
   ========================================================================== */

// Configures UI badges based on the degree's current status
const statusBadgeConfig = {
    ongoing: {
        label: "Ongoing",
        classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10",
        bulletMarker: "marker:text-emerald-500/70",
        accentBorder: "hover:border-emerald-500/40 hover:shadow-emerald-500/5",
        dotBorder: "border-emerald-500 group-hover:bg-emerald-500 shadow-emerald-500/10"
    },
    planned: {
        label: "Planned",
        classes: "bg-purple-500/10 text-purple-400 border-purple-500/10",
        bulletMarker: "marker:text-purple-500/70",
        accentBorder: "hover:border-purple-500/40 hover:shadow-purple-500/5",
        dotBorder: "border-purple-500 group-hover:bg-purple-500 shadow-purple-500/10"
    },
    dropped: {
        label: "Dropped",
        classes: "bg-red-500/10 text-red-400 border-red-500/10",
        bulletMarker: "marker:text-red-500/70",
        accentBorder: "hover:border-red-500/40 hover:shadow-red-500/5",
        dotBorder: "border-red-500 group-hover:bg-red-500 shadow-red-500/10"
    }
};

function renderEducationTimeline() {
    const educationContainer = document.getElementById('education-timeline');
    if (!educationContainer) return;

    educationContainer.innerHTML = education.map(edu => {
        // Automatically default to "planned" config if status isn't matched
        const config = statusBadgeConfig[edu.status] || statusBadgeConfig.planned;

        const bulletsHTML = edu.bulletpoints
            .map(bullet => `<li>${bullet}</li>`)
            .join('');

        return `
            <div class="relative pl-10 sm:pl-16 group">
                <!-- Dynamic Status Color Dot -->
                <div class="absolute left-4 sm:left-8 top-2.5 w-4 h-4 rounded-full bg-zinc-950 border-2 ${config.dotBorder} group-hover:scale-125 transition-all duration-300 shadow-md"></div>

                <!-- Dynamic Status Color Glass Card -->
                <div class="bg-zinc-900/30 backdrop-blur-xs border border-zinc-800/80 rounded-xl p-5 shadow-lg transition-all duration-300 ${config.accentBorder}">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                        <div>
                            <h3 class="text-base sm:text-lg font-bold text-white transition-colors duration-200">${edu.title}</h3>
                            <p class="text-xs sm:text-sm text-zinc-400 font-medium">${edu.name}</p>
                        </div>
                        <div class="flex flex-col items-end gap-1.5 self-start mt-1 sm:mt-0">
                            <!-- Date Range Badge -->
                            <span class="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded bg-zinc-900/80 text-zinc-300 border border-zinc-800 whitespace-nowrap">
                                ${edu.date}
                            </span>
                            <!-- Dynamic Status Label Badge -->
                            <span class="text-[9px] tracking-wide uppercase font-bold px-2 py-0.5 rounded border ${config.classes} whitespace-nowrap">
                                ${config.label}
                            </span>
                        </div>
                    </div>

                    <p class="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">${edu.description}</p>

                    <ul class="mt-2.5 space-y-1.5 text-xs sm:text-sm text-zinc-400 list-disc list-inside ${config.bulletMarker} pl-1">
                        ${bulletsHTML}
                    </ul>
                </div>
            </div>
        `;
    }).join('');
}

/* ==========================================================================
   4. CONTACT CARDS RENDERING PIPELINE (WITH FALLBACK SVGS)
   ========================================================================== */

// Reusable SVG vectors saved in static constants
const SVG_EMAIL = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
`;

const SVG_LINKEDIN = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
`;

const SVG_GITHUB = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
`;

const SVG_KAGGLE = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
`;

// Standard Globe/Browser icon for any other custom platform
const SVG_BROWSER_DEFAULT = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
`;

// Dynamic Styles and SVGs mapped by Platform Names
const contactPlatformConfig = {
    Email: {
        glowColor: "hover:border-red-500/50 hover:shadow-red-500/5",
        accentText: "text-red-400",
        accentBg: "bg-red-500/5 border-red-500/10",
        svg: SVG_EMAIL
    },
    LinkedIn: {
        glowColor: "hover:border-sky-500/50 hover:shadow-sky-500/5",
        accentText: "text-sky-400",
        accentBg: "bg-sky-500/5 border-sky-500/10",
        svg: SVG_LINKEDIN
    },
    GitHub: {
        glowColor: "hover:border-purple-500/50 hover:shadow-purple-500/5",
        accentText: "text-purple-400",
        accentBg: "bg-purple-500/5 border-purple-500/10",
        svg: SVG_GITHUB
    },
    Kaggle: {
        glowColor: "hover:border-blue-400/50 hover:shadow-blue-400/5",
        accentText: "text-blue-400",
        accentBg: "bg-blue-500/5 border-blue-500/10",
        svg: SVG_KAGGLE
    },
    // Default config that will be applied to any custom platforms
    Default: {
        glowColor: "hover:border-zinc-500/50 hover:shadow-zinc-500/5",
        accentText: "text-zinc-300",
        accentBg: "bg-zinc-800/10 border-zinc-800/20",
        svg: SVG_BROWSER_DEFAULT
    }
};

function renderContactCards() {
    const contactGrid = document.getElementById('contact-grid');
    if (!contactGrid) return;

    contactGrid.innerHTML = contact.map(platform => {
        // Fallback to our default browser config if platform isn't matched
        const config = contactPlatformConfig[platform.name] || contactPlatformConfig.Default;

        return `
            <a href="${platform.link}" target="_blank" rel="noopener noreferrer" class="group relative bg-zinc-950/40 backdrop-blur-xs rounded-xl p-6 border border-zinc-800 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden ${config.glowColor}">
                <div class="absolute -top-4 -right-4 w-20 h-20 bg-zinc-500/5 rounded-full blur-xl group-hover:bg-zinc-500/10 transition-all duration-300"></div>
                <div>
                    <!-- Visual Icon Shield -->
                    <div class="${config.accentText} mb-4 ${config.accentBg} w-10 h-10 rounded-lg flex items-center justify-center border">
                        ${config.svg}
                    </div>
                    <h3 class="text-xl font-bold text-white group-hover:${config.accentText} transition-colors duration-200">
                        ${platform.name}
                    </h3>
                    <p class="mt-2 text-sm text-zinc-400 leading-relaxed">
                        ${platform.description}
                    </p>
                </div>
                <div class="mt-6 flex items-center text-xs font-semibold ${config.accentText} group-hover:translate-x-1 transition-transform duration-200">
                    Get in touch <span class="ml-1.5">&rarr;</span>
                </div>
            </a>
        `;
    }).join('');
}