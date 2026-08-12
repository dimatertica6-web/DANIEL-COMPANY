class Router {
    constructor() {
        this.routes = {};
        this.currentPage = null;
        this.init();
    }

    init() {
        this.loadRoutes();
        this.bindNavigation();
        this.handleInitialPage();
    }

    loadRoutes() {
        this.routes = {
            'home': { title: 'Главная', url: 'pages/home.html' },
            'clan': { title: 'Клан', url: 'pages/clan.html' },
            'members': { title: 'Участники', url: 'pages/members.html' },
            'alliances': { title: 'Союз', url: 'pages/alliances.html' },
            'about': { title: 'О нас', url: 'pages/about.html' },
            'region': { title: 'Регион', url: 'pages/region.html' },
            'archive': { title: 'Архив', url: 'pages/archive.html' }
        };
    }

    bindNavigation() {
        var self = this;
        document.addEventListener('click', function(e) {
            var link = e.target.closest('[data-page]');
            if (link) {
                e.preventDefault();
                var page = link.dataset.page;
                self.navigate(page);
            }
        });

        window.addEventListener('popstate', function(e) {
            if (e.state && e.state.page) {
                self.loadPage(e.state.page);
            }
        });
    }

    handleInitialPage() {
        var hash = window.location.hash.replace('#', '');
        var page = hash || 'home';
        this.navigate(page, false);
    }

    navigate(page, pushState) {
        if (pushState === undefined) pushState = true;
        if (this.currentPage === page) return;

        this.currentPage = page;

        if (pushState) {
            window.history.pushState({ page: page }, '', '#' + page);
        }

        this.loadPage(page);
    }

    loadPage(page) {
        var route = this.routes[page];
        if (!route) {
            this.show404(page);
            return;
        }

        this.showLoading();
        var self = this;

        fetch(route.url)
            .then(function(res) {
                if (!res.ok) throw new Error('HTTP error! status: ' + res.status);
                return res.text();
            })
            .then(function(html) {
                self.renderPage(html, page);
                self.updateTitle(route.title);
                self.updateActiveNav(page);
                self.hideLoading();
                self.afterPageLoad();
            })
            .catch(function(err) {
                console.error('Router error:', err);
                self.show404(page);
                self.hideLoading();
            });
    }

    renderPage(html, page) {
        var mainContent = document.getElementById('main-content');

        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var content = doc.querySelector('.page-content') || doc.querySelector('.container') || doc.body;

        mainContent.innerHTML = '';
        if (content) {
            mainContent.appendChild(content.cloneNode(true));
        } else {
            mainContent.innerHTML = html;
        }

        mainContent.classList.add('page-transition');
        setTimeout(function() {
            mainContent.classList.remove('page-transition');
        }, 400);
    }

    updateTitle(title) {
        document.title = title + ' • Малосольны';
    }

    updateActiveNav(page) {
        document.querySelectorAll('#navLinks a').forEach(function(link) {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
    }

    showLoading() {
        var mainContent = document.getElementById('main-content');
        if (mainContent && !mainContent.querySelector('.loading')) {
            mainContent.innerHTML = '<div class="loading">Загрузка</div>';
        }
    }

    hideLoading() {
        var loading = document.querySelector('.loading');
        if (loading) {
            loading.remove();
        }
    }

    afterPageLoad() {
        if (window.initAnimations) window.initAnimations();
        if (window.initComponents) window.initComponents();
        if (window.initEventListeners) window.initEventListeners();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    show404(page) {
        var mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="page-content">
                <h1>404 — Страница не найдена</h1>
                <p>Страница "${page}" не существует. Вернитесь на <a href="#" data-page="home" style="text-decoration:underline;color:#000;cursor:pointer;">главную</a>.</p>
            </div>
        `;
        document.title = '404 • Малосольны';
    }

    getCurrentPage() {
        return this.currentPage;
    }
}

function initRouter() {
    var router = new Router();
    window.router = router;
}

window.initRouter = initRouter;
