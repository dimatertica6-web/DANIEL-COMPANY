

document.addEventListener('DOMContentLoaded', function() {

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const modules = document.querySelectorAll('.module-card');
            if (modules.length) {
                modules.forEach(function(card) {
                    const text = card.textContent.toLowerCase();
                    card.style.display = text.includes(query) ? '' : 'none';
                });
            }
            const items = document.querySelectorAll('.doc-table tbody tr');
            if (items.length) {
                items.forEach(function(row) {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(query) ? '' : 'none';
                });
            }
            const sections = document.querySelectorAll('.feature-item, .tool-card, .practice-item');
            if (sections.length) {
                sections.forEach(function(el) {
                    const text = el.textContent.toLowerCase();
                    el.style.display = text.includes(query) ? '' : 'none';
                });
            }
        });
    }

    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block').querySelector('code');
            if (codeBlock) {
                const text = codeBlock.textContent;
                navigator.clipboard.writeText(text).then(function() {
                    const original = btn.textContent;
                    btn.textContent = '✓ Copied!';
                    btn.style.color = '#22c55e';
                    btn.style.borderColor = '#22c55e';
                    setTimeout(function() {
                        btn.textContent = original;
                        btn.style.color = '';
                        btn.style.borderColor = '';
                    }, 2000);
                }).catch(function() {
                    const range = document.createRange();
                    range.selectNode(codeBlock);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                    document.execCommand('copy');
                    window.getSelection().removeAllRanges();
                    const original = btn.textContent;
                    btn.textContent = '✓ Copied!';
                    btn.style.color = '#22c55e';
                    btn.style.borderColor = '#22c55e';
                    setTimeout(function() {
                        btn.textContent = original;
                        btn.style.color = '';
                        btn.style.borderColor = '';
                    }, 2000);
                });
            }
        });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length) {
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                const filter = this.dataset.filter;
                const cards = document.querySelectorAll('.module-card');
                cards.forEach(function(card) {
                    if (filter === 'all') {
                        card.style.display = '';
                    } else {
                        const category = card.dataset.category;
                        card.style.display = category === filter ? '' : 'none';
                    }
                });
            });
        });
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            navLinks.forEach(function(l) { l.classList.remove('active'); });
            this.classList.add('active');
        });
    });

    const currentPath = window.location.pathname;
    const pageMap = {
        'index.html': 'Home',
        'getting-started.html': 'Start',
        'modules.html': 'Modules',
        'api.html': 'API',
        'security.html': 'Security',
        'faq.html': 'FAQ',
        'anonymity.html': 'Modules',
        'crypto.html': 'Modules',
        'scanning.html': 'Modules',
        'exploitation.html': 'Modules',
        'network.html': 'Modules',
        'forensic.html': 'Modules',
        'optimization.html': 'Modules',
        'changelog.html': 'Home'
    };
    const fileName = currentPath.split('/').pop() || 'index.html';
    const activePage = pageMap[fileName] || '';
    if (activePage) {
        navLinks.forEach(function(link) {
            if (link.textContent.trim() === activePage) {
                link.classList.add('active');
            }
        });
    }

    const codeBlocks = document.querySelectorAll('.code-block pre');
    codeBlocks.forEach(function(block) {
        const lines = block.textContent.split('\n');
        if (lines.length > 1) {
            const minIndent = lines
                .filter(function(line) { return line.trim().length > 0; })
                .reduce(function(min, line) {
                    const indent = line.match(/^ */)[0].length;
                    return Math.min(min, indent);
                }, Infinity);
            if (minIndent > 0 && minIndent < Infinity) {
                const trimmed = lines.map(function(line) {
                    return line.slice(minIndent);
                });
                block.textContent = trimmed.join('\n');
            }
        }
    });

    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const navSearch = document.querySelector('.nav-search');
    if (navSearch) {
        const searchInput = navSearch.querySelector('input');
        const searchIcon = navSearch.querySelector('svg');
        if (searchInput && searchIcon) {
            searchInput.addEventListener('focus', function() {
                searchIcon.style.color = '#2563eb';
                this.style.borderColor = '#2563eb';
                this.style.boxShadow = '0 0 0 3px #2563eb20';
            });
            searchInput.addEventListener('blur', function() {
                searchIcon.style.color = '';
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        }
    }

    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('mouseenter', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'rotate(45deg) scale(1.05)';
            }
        });
        navBrand.addEventListener('mouseleave', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = '';
            }
        });
    }

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(function(card, index) {
        card.style.animationDelay = (index * 0.1) + 's';
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon svg');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon svg');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            const number = this.querySelector('.module-number');
            if (number) {
                number.style.background = '#2563eb';
                number.style.color = '#ffffff';
                number.style.transition = 'all 0.3s ease';
            }
        });
        card.addEventListener('mouseleave', function() {
            const number = this.querySelector('.module-number');
            if (number) {
                number.style.background = '';
                number.style.color = '';
            }
        });
    });

    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            const tag = this.querySelector('.news-tag');
            if (tag) {
                tag.style.background = '#2563eb';
                tag.style.color = '#ffffff';
                tag.style.transition = 'all 0.3s ease';
            }
        });
        card.addEventListener('mouseleave', function() {
            const tag = this.querySelector('.news-tag');
            if (tag) {
                tag.style.background = '';
                tag.style.color = '';
            }
        });
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.textContent.replace(/[^0-9]/g, ''));
                    if (target && !el.dataset.counted) {
                        el.dataset.counted = 'true';
                        let current = 0;
                        const increment = Math.ceil(target / 40);
                        const timer = setInterval(function() {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            el.textContent = current + '+';
                        }, 30);
                    }
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(function(el) {
            observer.observe(el);
        });
    }

    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const moveX = (x - 0.5) * 10;
                const moveY = (y - 0.5) * 10;
                const badge = this.querySelector('.hero-badge');
                const h1 = this.querySelector('h1');
                const p = this.querySelector('p');
                if (badge) {
                    badge.style.transform = 'translate(' + (moveX * 0.3) + 'px, ' + (moveY * 0.3) + 'px)';
                }
                if (h1) {
                    h1.style.transform = 'translate(' + (moveX * 0.2) + 'px, ' + (moveY * 0.2) + 'px)';
                }
                if (p) {
                    p.style.transform = 'translate(' + (moveX * 0.1) + 'px, ' + (moveY * 0.1) + 'px)';
                }
            });
            heroContent.addEventListener('mouseleave', function() {
                const badge = this.querySelector('.hero-badge');
                const h1 = this.querySelector('h1');
                const p = this.querySelector('p');
                if (badge) badge.style.transform = '';
                if (h1) h1.style.transform = '';
                if (p) p.style.transform = '';
            });
        }
    }

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
            navbar.style.borderBottom = '1px solid transparent';
        } else {
            navbar.style.boxShadow = '';
            navbar.style.borderBottom = '';
        }
        lastScroll = currentScroll;
    });

    const tocLinks = document.querySelectorAll('.api-nav a');
    tocLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                tocLinks.forEach(function(l) { l.style.color = ''; });
                this.style.color = '#2563eb';
            }
        });
    });

    const tableRows = document.querySelectorAll('.doc-table tbody tr');
    tableRows.forEach(function(row) {
        row.addEventListener('mouseenter', function() {
            this.style.background = '#f0f4ff';
        });
        row.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    const statusBadges = document.querySelectorAll('.status-active, .status-beta');
    statusBadges.forEach(function(badge) {
        badge.style.padding = '2px 12px';
        badge.style.borderRadius = '100px';
        badge.style.fontSize = '12px';
        badge.style.fontWeight = '600';
        if (badge.classList.contains('status-active')) {
            badge.style.background = '#22c55e15';
            badge.style.color = '#22c55e';
        }
        if (badge.classList.contains('status-beta')) {
            badge.style.background = '#eab30815';
            badge.style.color = '#eab308';
        }
    });

    const steps = document.querySelectorAll('.step');
    steps.forEach(function(step, index) {
        step.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.1) + 's both';
        const number = step.querySelector('.step-number');
        if (number) {
            number.textContent = index + 1;
        }
    });

    const examples = document.querySelectorAll('.example');
    examples.forEach(function(example, index) {
        example.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.1) + 's both';
    });

    const principleCards = document.querySelectorAll('.principle-card');
    principleCards.forEach(function(card, index) {
        card.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.1) + 's both';
    });

    const threatCards = document.querySelectorAll('.threat-card');
    threatCards.forEach(function(card, index) {
        card.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.1) + 's both';
    });

    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(function(card, index) {
        card.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.1) + 's both';
    });

    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(function(item, index) {
        item.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.1) + 's both';
    });

    const practiceItems = document.querySelectorAll('.practice-item');
    practiceItems.forEach(function(item, index) {
        item.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.1) + 's both';
    });

    const apiItems = document.querySelectorAll('.api-item');
    apiItems.forEach(function(item, index) {
        item.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.1) + 's both';
    });

    const disclosureInfo = document.querySelector('.disclosure-info');
    if (disclosureInfo) {
        disclosureInfo.style.animation = 'fadeIn 0.5s ease-out 0.3s both';
    }

    const moduleStats = document.querySelector('.module-stats');
    if (moduleStats) {
        moduleStats.style.animation = 'fadeIn 0.5s ease-out 0.2s both';
    }

    const pageHeaders = document.querySelectorAll('.page-header');
    pageHeaders.forEach(function(header) {
        header.style.animation = 'fadeIn 0.6s ease-out both';
    });

    const docSections = document.querySelectorAll('.doc-section');
    docSections.forEach(function(section, index) {
        section.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.08) + 's both';
    });

    const quickLinks = document.querySelectorAll('.quick-link');
    quickLinks.forEach(function(link, index) {
        link.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.1 + 0.3) + 's both';
    });

    const heroStats = document.querySelectorAll('.stat');
    heroStats.forEach(function(stat, index) {
        stat.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.1 + 0.4) + 's both';
    });

    const heroActions = document.querySelectorAll('.hero-actions .btn-primary, .hero-actions .btn-secondary, .hero-actions .btn-outline');
    heroActions.forEach(function(btn, index) {
        btn.style.animation = 'fadeIn 0.5s ease-out ' + (index * 0.1 + 0.2) + 's both';
    });

    const navSearchInput = document.querySelector('.nav-search input');
    if (navSearchInput) {
        navSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.blur();
                this.value = '';
                const event = new Event('input');
                this.dispatchEvent(event);
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const search = document.querySelector('.nav-search input');
            if (search) {
                search.focus();
                search.select();
            }
        }
    });

    const footerYear = document.querySelector('.footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(function(btn) {
        btn.setAttribute('aria-label', 'Copy code to clipboard');
    });

    const navLinksAll = document.querySelectorAll('.nav-links a');
    navLinksAll.forEach(function(link) {
        link.setAttribute('aria-current', link.classList.contains('active') ? 'page' : 'false');
    });

    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        img.setAttribute('loading', 'lazy');
    });

    console.log('ERASER v13.0 Documentation loaded successfully');
    console.log('© 2026 ERASER Team. MIT License');
    console.log('Documentation built with ❤️');

});
