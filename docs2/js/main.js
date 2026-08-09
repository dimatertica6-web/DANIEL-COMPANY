
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initCodeBlocks();
    initSearch();
    initTabs();
    initCopyButtons();
    initScrollToTop();
    initMobileMenu();
    initThemeToggle();
    initPagination();
    initAccordion();
    initTooltips();
    initCharts();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

function initCodeBlocks() {
    document.querySelectorAll('.code-block pre code').forEach(block => {
        block.textContent = block.textContent.trim();
    });
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.searchable');

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

function initTabs() {
    document.querySelectorAll('.tab-group').forEach(group => {
        const tabs = group.querySelectorAll('.tab');
        const contents = group.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.dataset.tab;

                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                contents.forEach(c => c.classList.remove('active'));
                const content = group.querySelector(`.tab-content[data-content="${target}"]`);
                if (content) content.classList.add('active');
            });
        });
    });
}

function initCopyButtons() {
    document.querySelectorAll('.code-block').forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.setAttribute('aria-label', 'Copy code');

        copyBtn.addEventListener('click', function() {
            const code = block.querySelector('code');
            if (!code) return;

            navigator.clipboard.writeText(code.textContent).then(() => {
                this.textContent = 'Copied!';
                setTimeout(() => { this.textContent = 'Copy'; }, 2000);
            }).catch(() => {
                const range = document.createRange();
                range.selectNode(code);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                this.textContent = 'Copied!';
                setTimeout(() => { this.textContent = 'Copy'; }, 2000);
            });
        });

        block.style.position = 'relative';
        block.appendChild(copyBtn);
    });
}

function initScrollToTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-links');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        this.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            nav.classList.remove('open');
            if (toggle) toggle.classList.remove('active');
        }
    });
}

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', savedTheme);
    toggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    toggle.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        this.textContent = next === 'dark' ? '☀️' : '🌙';
    });
}

function initPagination() {
    document.querySelectorAll('.pagination').forEach(pagination => {
        const prevBtn = pagination.querySelector('.prev');
        const nextBtn = pagination.querySelector('.next');
        const pages = pagination.querySelectorAll('.page');

        if (!pages.length) return;

        let currentPage = 0;

        function updatePagination() {
            pages.forEach((page, index) => {
                page.classList.toggle('active', index === currentPage);
            });

            if (prevBtn) prevBtn.disabled = currentPage === 0;
            if (nextBtn) nextBtn.disabled = currentPage === pages.length - 1;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentPage > 0) {
                    currentPage--;
                    updatePagination();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (currentPage < pages.length - 1) {
                    currentPage++;
                    updatePagination();
                }
            });
        }

        pages.forEach(page => {
            page.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (!isNaN(index)) {
                    currentPage = index;
                    updatePagination();
                }
            });
        });

        updatePagination();
    });
}

function initAccordion() {
    document.querySelectorAll('.accordion').forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion-item');

        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (!header) return;

            header.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');

                if (accordion.dataset.multiple !== 'true') {
                    items.forEach(i => i.classList.remove('open'));
                }

                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        });
    });
}

function initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        const text = element.dataset.tooltip;
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;

        element.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - 50 + 'px';
            tooltip.style.top = rect.top - 10 + 'px';
            document.body.appendChild(tooltip);
            setTimeout(() => tooltip.classList.add('visible'), 10);
        });

        element.addEventListener('mouseleave', function() {
            tooltip.classList.remove('visible');
            setTimeout(() => tooltip.remove(), 200);
        });
    });
}

function initCharts() {
    document.querySelectorAll('.chart').forEach(chart => {
        const type = chart.dataset.type;
        const data = JSON.parse(chart.dataset.data || '{}');
        const labels = JSON.parse(chart.dataset.labels || '[]');
        const values = JSON.parse(chart.dataset.values || '[]');

        if (!labels.length || !values.length) return;

        const canvas = chart.querySelector('canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width || 400;
        const height = canvas.height || 200;

        canvas.width = width;
        canvas.height = height;

        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const maxVal = Math.max(...values) * 1.2;

        ctx.clearRect(0, 0, width, height);

        if (type === 'bar') {
            const barWidth = chartWidth / values.length * 0.6;
            const spacing = chartWidth / values.length;

            ctx.fillStyle = '#1a1a1a';
            ctx.font = '12px -apple-system, sans-serif';
            ctx.textAlign = 'center';

            values.forEach((val, i) => {
                const x = padding + i * spacing + (spacing - barWidth) / 2;
                const barHeight = (val / maxVal) * chartHeight;
                const y = padding + chartHeight - barHeight;

                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(x, y, barWidth, barHeight);

                ctx.fillStyle = '#888';
                ctx.fillText(labels[i] || '', x + barWidth / 2, padding + chartHeight + 20);

                ctx.fillStyle = '#1a1a1a';
                ctx.font = '10px -apple-system, sans-serif';
                ctx.fillText(val, x + barWidth / 2, y - 6);
            });
        }

        if (type === 'line') {
            ctx.strokeStyle = '#1a1a1a';
            ctx.lineWidth = 2;
            ctx.beginPath();

            values.forEach((val, i) => {
                const x = padding + (i / (values.length - 1 || 1)) * chartWidth;
                const y = padding + chartHeight - (val / maxVal) * chartHeight;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();

            values.forEach((val, i) => {
                const x = padding + (i / (values.length - 1 || 1)) * chartWidth;
                const y = padding + chartHeight - (val / maxVal) * chartHeight;

                ctx.fillStyle = '#1a1a1a';
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#888';
                ctx.font = '10px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(val, x, y - 10);
            });
        }

        if (type === 'pie') {
            const cx = width / 2;
            const cy = height / 2;
            const radius = Math.min(width, height) / 2 - 40;
            let startAngle = -Math.PI / 2;

            const total = values.reduce((a, b) => a + b, 0);

            values.forEach((val, i) => {
                const sliceAngle = (val / total) * Math.PI * 2;
                const endAngle = startAngle + sliceAngle;

                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, radius, startAngle, endAngle);
                ctx.closePath();

                ctx.fillStyle = `hsl(${i * 60}, 70%, 50%)`;
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();

                const midAngle = startAngle + sliceAngle / 2;
                const labelX = cx + (radius * 0.6) * Math.cos(midAngle);
                const labelY = cy + (radius * 0.6) * Math.sin(midAngle);

                ctx.fillStyle = '#fff';
                ctx.font = '12px -apple-system, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const pct = ((val / total) * 100).toFixed(1);
                ctx.fillText(pct + '%', labelX, labelY);

                startAngle = endAngle;
            });
        }
    });
}

function initTableOfContents() {
    const toc = document.querySelector('.toc');
    if (!toc) return;

    const headings = document.querySelectorAll('main h2, main h3');
    const list = document.createElement('ul');

    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = `section-${index}`;
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;

        if (heading.tagName === 'H3') {
            li.style.paddingLeft = '20px';
        }

        li.appendChild(a);
        list.appendChild(li);
    });

    toc.appendChild(list);

    document.querySelectorAll('.toc a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initBreadcrumbs() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (!breadcrumb) return;

    const path = window.location.pathname.split('/').pop() || 'index.html';
    const pages = {
        'index.html': 'Home',
        'getting-started.html': 'Getting Started',
        'modules.html': 'Modules',
        'commands.html': 'Commands',
        'api.html': 'API',
        'deployment.html': 'Deployment',
        'configuration.html': 'Configuration',
        'logging.html': 'Logging',
        'security.html': 'Security',
        'troubleshooting.html': 'Troubleshooting',
        'contributing.html': 'Contributing',
        'changelog.html': 'Changelog',
        'license.html': 'License',
        'about.html': 'About',
        'contact.html': 'Contact'
    };

    let html = '<a href="index.html">Home</a>';
    if (path !== 'index.html' && pages[path]) {
        html += ` <span>/</span> <span>${pages[path]}</span>`;
    }

    breadcrumb.innerHTML = html;
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const search = document.getElementById('search-input');
            if (search) search.focus();
        }

        if (e.key === 'Escape') {
            const search = document.getElementById('search-input');
            if (search && document.activeElement === search) {
                search.blur();
            }
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initVersionSelector() {
    const selector = document.getElementById('version-selector');
    if (!selector) return;

    const versions = ['8.0.0', '7.0.0', '6.0.0', '5.0.0'];
    versions.forEach(v => {
        const option = document.createElement('option');
        option.value = v;
        option.textContent = `v${v}`;
        selector.appendChild(option);
    });

    selector.addEventListener('change', function() {
        const version = this.value;
        window.location.href = `/docs/${version}/`;
    });
}

function initFeedbackWidget() {
    const feedback = document.querySelector('.feedback');
    if (!feedback) return;

    const buttons = feedback.querySelectorAll('.feedback-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const value = this.dataset.value;
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const message = document.createElement('p');
            message.className = 'feedback-message';
            message.textContent = 'Thanks for your feedback!';

            feedback.appendChild(message);

            setTimeout(() => {
                message.remove();
                buttons.forEach(b => b.classList.remove('active'));
            }, 3000);
        });
    });
}

console.log('RERONRF BOT Documentation v8.0.0');
console.log('© 2026 by @concole_hack');
console.log('Documentation loaded successfully!');
