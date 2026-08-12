document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Малосольны клан загружен');

    function initApp() {
        loadHeader();
        loadFooter();
        loadPage('home');
        initNavigation();
        console.log('✅ Все модули загружены');
    }

    window.loadPage = loadPage;
    window.updateActiveNav = updateActiveNav;

    initApp();
});

function initNavigation() {
    var navLinks = document.querySelectorAll('#navLinks a, .logo');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var page = this.dataset.page || 'home';
            loadPage(page);
            updateActiveNav(page);
        });
    });
}
