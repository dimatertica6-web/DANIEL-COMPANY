function initNavigation() {
    var navLinks = document.querySelectorAll('#navLinks a, .logo');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var page = this.dataset.page || 'home';

            if (window.router) {
                window.router.navigate(page);
            } else {
                var pageUrl = '/pages/' + page + '.html';

                fetch(pageUrl)
                    .then(function(res) {
                        if (!res.ok) throw new Error('Page not found: ' + page);
                        return res.text();
                    })
                    .then(function(html) {
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(html, 'text/html');
                        var content = doc.querySelector('.page-content') || doc.querySelector('.container');

                        if (content) {
                            var mainContent = document.getElementById('main-content');
                            mainContent.innerHTML = '';
                            mainContent.appendChild(content.cloneNode(true));

                            window.scrollTo({ top: 0, behavior: 'smooth' });

                            document.querySelectorAll('#navLinks a').forEach(function(l) {
                                l.classList.remove('active');
                            });
                            this.classList.add('active');

                            if (window.initAnimations) window.initAnimations();
                            if (window.initComponents) window.initComponents();
                        }
                    }.bind(this))
                    .catch(function(err) {
                        console.error('Navigation error:', err);
                        show404(page);
                    });
            }
        }.bind(link));
    });

    function show404(page) {
        var mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="page-content">
                <h1>404 — Страница не найдена</h1>
                <p>Страница "${page}" не найдена. Вернитесь на <a href="#" data-page="home" style="text-decoration:underline;color:#000;cursor:pointer;">главную</a>.</p>
            </div>
        `;
    }
}

window.initNavigation = initNavigation;
