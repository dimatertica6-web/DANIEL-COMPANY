function loadHeader() {
    var headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    var headerHTML = `
        <nav class="navbar">
            <span class="logo" data-page="home">
                <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                </svg>
                Малосольны
            </span>
            <ul class="nav-links" id="navLinks">
                <li><a href="#" data-page="home" class="active">Главная</a></li>
                <li><a href="#" data-page="clan">Клан</a></li>
                <li><a href="#" data-page="members">Участники</a></li>
                <li><a href="#" data-page="alliances">Союз</a></li>
                <li><a href="#" data-page="about">О нас</a></li>
                <li><a href="#" data-page="region">Регион</a></li>
                <li><a href="#" data-page="archive">Архив</a></li>
            </ul>
        </nav>
    `;

    headerContainer.innerHTML = headerHTML;
}

function loadFooter() {
    var footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    var footerHTML = `
        <footer class="site-footer">
            <p>by <span class="highlight">@concole_hack</span>  •  дизайн и код</p>
            <p class="tiny">Малосольны • 2024 — 2026 • все права защищены</p>
            <p class="tiny" style="margin-top: 0.4rem; opacity: 0.5;">ewe • cuboid • приоритет 0 • размер 134 890</p>
            <p class="tiny" style="margin-top: 0.2rem; opacity: 0.35;">границы: (-5331, 36, -6144) → (-5250, 82, -6110)</p>
            <p class="tiny" style="margin-top:0.4rem; opacity:0.3;">Roboto Mono • минимализм • 2026</p>
        </footer>
    `;

    footerContainer.innerHTML = footerHTML;
}

function loadPage(page) {
    var mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    var pages = {
        'home': getHomePage,
        'clan': getClanPage,
        'members': getMembersPage,
        'alliances': getAlliancesPage,
        'about': getAboutPage,
        'region': getRegionPage,
        'archive': getArchivePage
    };

    var loader = pages[page] || getHomePage;
    mainContent.innerHTML = loader();

    updateActiveNav(page);
}

function updateActiveNav(page) {
    document.querySelectorAll('#navLinks a').forEach(function(link) {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
}

function getHomePage() {
    return `
        <section class="hero fade-up">
            <div class="hero-content">
                <h1 class="glitch">Малосольны</h1>
                <div class="hero-meta">
                    <span class="chip">с 2024</span>
                    <span class="chip">✦ 2026</span>
                    <span class="chip chip--region">ewe</span>
                    <span class="chip">тип cuboid</span>
                    <span class="chip">приоритет 0</span>
                    <span class="chip chip--outline">флаги —</span>
                    <span class="chip">статус: актив</span>
                </div>
                <p class="subtitle">минимализм • сила • единство • регион ewe • территория 134 890</p>
            </div>
            <div class="owner-card">
                <img src="https://app-uploads.krea.ai/public/6c875840-f539-4e29-bb5c-bba5ced50168-image.jpeg" alt="itz_GRom_2014" class="owner-avatar">
                <div class="owner-info">
                    <span class="owner-name">itz_GRom_2014</span>
                    <span class="owner-label">владелец клана</span>
                    <span style="font-size:0.6rem; color:#777; letter-spacing:0.04em;">основатель • 2024</span>
                </div>
            </div>
        </section>
        <div class="grid-4col fade-up">
            <div class="mini-stat"><div class="num">6</div><div class="label">участников</div></div>
            <div class="mini-stat"><div class="num">134 890</div><div class="label">территория</div></div>
            <div class="mini-stat"><div class="num">2024</div><div class="label">год основания</div></div>
            <div class="mini-stat"><div class="num">ewe</div><div class="label">регион</div></div>
        </div>
        <div class="grid-2col fade-up">
            <div class="card">
                <div class="card-header">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4l3 3"/>
                    </svg>
                    <h3>Регион ewe</h3>
                </div>
                <div class="stat-list">
                    <div><span>Тип</span><span>cuboid</span></div>
                    <div><span>Приоритет</span><span>0</span></div>
                    <div><span>Владельцы</span><span>itz_GRom_2014</span></div>
                    <div><span>Границы</span><span class="mono">(-5331,36,-6144) → (-5250,82,-6110)</span></div>
                    <div><span>Размер</span><span>134 890</span></div>
                    <div><span>Флаги</span><span>—</span></div>
                    <div><span>Статус</span><span>активен</span></div>
                    <div><span>Дата обновления</span><span>12.08.2026</span></div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <h3>Участники (6)</h3>
                </div>
                <ul class="member-list">
                    <li>itz_GRom_2014 <span class="badge">владелец</span></li>
                    <li>Egor470</li>
                    <li>FoodMaster1233</li>
                    <li>egor4ik_pvpp</li>
                    <li>programm_inc</li>
                    <li>s1mple_580fps</li>
                    <li style="width:100%; margin-top:0.2rem; border-bottom:none;"><span class="badge" style="background:#ddd;">+10 заявок</span></li>
                </ul>
                <div style="margin-top: 1.2rem; font-size: 0.85rem; color: #3a3a3a; border-top: 1px solid #e8e8e8; padding-top: 1rem;">
                    <span>Модераторы: programm_inc</span>
                </div>
                <div style="margin-top: 0.4rem; font-size: 0.85rem; color: #3a3a3a;">
                    <span>Всего участников: 6 / 20</span>
                </div>
            </div>
        </div>
        <div class="grid-3col fade-up">
            <div class="card">
                <div class="card-header">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M3 9h18"/>
                        <path d="M3 15h18"/>
                        <path d="M9 3v18"/>
                    </svg>
                    <h3>Статистика</h3>
                </div>
                <div class="info-row"><strong>Основан</strong> <span>2024</span></div>
                <div class="info-row"><strong>Возраст</strong> <span>2 года (2026)</span></div>
                <div class="info-row"><strong>Регион</strong> <span>ewe</span></div>
                <div class="info-row"><strong>Территория</strong> <span>134 890</span></div>
                <div class="info-row"><strong>Союз</strong> <span>Пельменский_союз</span></div>
                <div class="info-row"><strong>Тип</strong> <span>cuboid</span></div>
                <div class="info-row"><strong>Приоритет</strong> <span>0</span></div>
            </div>
            <div class="card">
                <div class="card-header">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                    <h3>Клан «МалоСольНи»</h3>
                </div>
                <div class="info-row"><strong>Владелец</strong> <span>Itz_GRom_2014</span></div>
                <div class="info-row"><strong>Модератор</strong> <span>programm_inc</span></div>
                <div class="info-row"><strong>Участников</strong> <span>6/20</span></div>
                <div class="info-row"><strong>Союз</strong> <span>Пельменский_союз</span></div>
                <div class="info-row"><strong>Описание</strong> <span class="muted">—</span></div>
                <div class="info-row"><strong>Статус</strong> <span>активен</span></div>
            </div>
            <div class="card">
                <div class="card-header">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M3 9h18"/>
                        <path d="M9 21V9"/>
                    </svg>
                    <h3>Границы</h3>
                </div>
                <div class="info-row"><strong>От</strong> <span class="mono">(-5331, 36, -6144)</span></div>
                <div class="info-row"><strong>До</strong> <span class="mono">(-5250, 82, -6110)</span></div>
                <div class="info-row"><strong>Размер</strong> <span>134 890</span></div>
                <div class="info-row"><strong>Тип</strong> <span>cuboid</span></div>
                <div class="info-row"><strong>Приоритет</strong> <span>0</span></div>
                <div class="info-row"><strong>Флаги</strong> <span>—</span></div>
            </div>
        </div>
        <section class="card">
            <div class="card-header">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3>Союзные кланы</h3>
                <span class="chip" style="margin-left: auto;">активен</span>
            </div>
            <div class="alliance-grid">
                <div class="ally-item"><span class="ally-name">Пельменский_союз</span><span class="ally-status">союз</span></div>
                <div class="ally-item"><span class="ally-name">Вражеские кланы</span><span class="ally-status ally-status--enemy">—</span></div>
                <div class="ally-item"><span class="ally-name">Нейтральные</span><span class="ally-status" style="background:#ececec; color:#444; border-color:#ccc;">—</span></div>
                <div class="ally-item"><span class="ally-name">Союзники (всего)</span><span class="ally-status" style="background:#dde6f0; border-color:#b8c8da;">1</span></div>
            </div>
            <div style="margin-top: 1.6rem; font-size: 0.85rem; color: #3a3a3a; background: #f7f7f7; padding: 0.4rem 1.6rem; display: inline-block; border: 1px solid #e6e6e6;">
                <span>Модераторы союза: programm_inc</span>
            </div>
            <div style="margin-top: 0.6rem; font-size: 0.8rem; color: #555;">
                <span>Всего союзных кланов: 1 • статус: стабильный</span>
            </div>
        </section>
        <section class="card">
            <div class="card-header">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                </svg>
                <h3>Клан «МалоСольНи»</h3>
                <span class="chip" style="margin-left: auto; background:#eaeaea;">6/20</span>
            </div>
            <div class="clan-detail-grid">
                <div><span>Владелец</span><strong>Itz_GRom_2014</strong></div>
                <div><span>Модераторы</span><strong>programm_inc</strong></div>
                <div><span>Участники</span><span class="mono" style="background:transparent; padding:0; font-size:0.8rem;">s1mple_580fps, Egor470, Mr_Domer, rakqtan4444, Igruhary, Euphoria1337, Itz_GRom_2014, programm_inc, egor4ik_pvpp, Aglae, FoodMaster1232, 156858914, FoodMaster1233, pop121pop, AmaAma_220228, 1i6_Zerda</span></div>
                <div><span>Описание</span><span class="muted">—</span></div>
                <div><span>Основан</span><span>2024</span></div>
                <div><span>Статус</span><span>активен</span></div>
                <div><span>Регион</span><span>ewe</span></div>
                <div><span>Территория</span><span>134 890</span></div>
            </div>
            <div class="timeline">
                <div class="timeline-item"><span class="year">2024</span><span class="desc">Основание клана</span></div>
                <div class="timeline-item"><span class="year">2025</span><span class="desc">Расширение региона ewe</span></div>
                <div class="timeline-item"><span class="year">2026</span><span class="desc">Союз с Пельменский_союз</span></div>
                <div class="timeline-item"><span class="year">2026</span><span class="desc">Текущий статус: актив</span></div>
            </div>
        </section>
        <div class="owner-big">
            <img src="https://app-uploads.krea.ai/public/6c875840-f539-4e29-bb5c-bba5ced50168-image.jpeg" alt="itz_GRom_2014">
            <div class="info">
                <span class="name">itz_GRom_2014</span>
                <span class="role">владелец клана • основатель • лидер</span>
                <span class="desc">Лидер клана Малосольны с 2024 года. Регион ewe, cuboid, приоритет 0. Активный участник и модератор сообщества.</span>
                <div style="display:flex; gap:0.8rem; flex-wrap:wrap; margin-top:0.4rem;">
                    <span class="chip" style="background:#eaeaea;">с 2024</span>
                    <span class="chip chip--region">ewe</span>
                    <span class="chip chip--outline">лидер</span>
                </div>
            </div>
        </div>
    `;
}

function getClanPage() {
    return `
        <div class="page-content">
            <h1>Клан «Малосольны»</h1>
            <div class="clan-detail-grid">
                <div><span>Владелец</span><strong>Itz_GRom_2014</strong></div>
                <div><span>Модераторы</span><strong>programm_inc</strong></div>
                <div><span>Участников</span><span>6/20</span></div>
                <div><span>Основан</span><span>2024</span></div>
                <div><span>Статус</span><span>активен</span></div>
                <div><span>Регион</span><span>ewe</span></div>
                <div><span>Территория</span><span>134 890</span></div>
                <div><span>Тип</span><span>cuboid</span></div>
                <div><span>Приоритет</span><span>0</span></div>
            </div>
            <div style="margin-top:2rem;">
                <h2>Описание</h2>
                <p>Малосольны — минималистичный клан, основанный в 2024 году. Клан объединяет игроков региона ewe.</p>
            </div>
        </div>
    `;
}

function getMembersPage() {
    return `
        <div class="page-content">
            <h1>Участники клана</h1>
            <ul class="member-list" style="display:flex; flex-direction:column; gap:0.5rem;">
                <li style="border-bottom:1px solid #eee; padding:0.5rem 0; width:100%;">itz_GRom_2014 <span class="badge">владелец</span></li>
                <li style="border-bottom:1px solid #eee; padding:0.5rem 0; width:100%;">programm_inc <span class="badge">модератор</span></li>
                <li style="border-bottom:1px solid #eee; padding:0.5rem 0; width:100%;">Egor470</li>
                <li style="border-bottom:1px solid #eee; padding:0.5rem 0; width:100%;">FoodMaster1233</li>
                <li style="border-bottom:1px solid #eee; padding:0.5rem 0; width:100%;">egor4ik_pvpp</li>
                <li style="border-bottom:1px solid #eee; padding:0.5rem 0; width:100%;">s1mple_580fps</li>
            </ul>
            <p style="margin-top:1.5rem;">Всего: <strong>6</strong> / 20</p>
        </div>
    `;
}

function getAlliancesPage() {
    return `
        <div class="page-content">
            <h1>Союзные кланы</h1>
            <div class="alliance-grid" style="margin-top:1.5rem;">
                <div class="ally-item"><span class="ally-name">Пельменский_союз</span><span class="ally-status">союз</span></div>
                <div class="ally-item"><span class="ally-name">Вражеские кланы</span><span class="ally-status ally-status--enemy">—</span></div>
                <div class="ally-item"><span class="ally-name">Нейтральные</span><span class="ally-status" style="background:#ececec; color:#444; border-color:#ccc;">—</span></div>
            </div>
            <p style="margin-top:2rem;">Всего союзных кланов: <strong>1</strong></p>
        </div>
    `;
}

function getAboutPage() {
    return `
        <div class="page-content">
            <h1>О клане</h1>
            <p>Малосольны — минималистичный клан в регионе ewe, основанный в 2024 году.</p>
            <p style="margin-top:1rem;">Наша философия — минимализм, сила и единство.</p>
            <div class="timeline" style="margin-top:2rem;">
                <div class="timeline-item"><span class="year">2024</span><span class="desc">Основание клана</span></div>
                <div class="timeline-item"><span class="year">2025</span><span class="desc">Расширение региона ewe</span></div>
                <div class="timeline-item"><span class="year">2026</span><span class="desc">Союз с Пельменский_союз</span></div>
            </div>
        </div>
    `;
}

function getRegionPage() {
    return `
        <div class="page-content">
            <h1>Регион ewe</h1>
            <div class="stat-list" style="margin-top:1.5rem;">
                <div class="stat-list__item">
                    <span class="stat-list__label">Тип</span>
                    <span class="stat-list__value">cuboid</span>
                </div>
                <div class="stat-list__item">
                    <span class="stat-list__label">Приоритет</span>
                    <span class="stat-list__value">0</span>
                </div>
                <div class="stat-list__item">
                    <span class="stat-list__label">Границы</span>
                    <span class="stat-list__value mono">(-5331,36,-6144) → (-5250,82,-6110)</span>
                </div>
                <div class="stat-list__item">
                    <span class="stat-list__label">Размер</span>
                    <span class="stat-list__value">134 890</span>
                </div>
            </div>
        </div>
    `;
}

function getArchivePage() {
    return `
        <div class="page-content">
            <h1>Архив</h1>
            <p>Архивные записи и исторические данные клана.</p>
            <div style="margin-top:2rem; display:grid; gap:1rem;">
                <div class="card" style="padding:1.5rem;">
                    <h3>2024 год</h3>
                    <p style="color:#666; font-size:0.9rem;">Основание клана, первые шаги в регионе ewe.</p>
                </div>
                <div class="card" style="padding:1.5rem;">
                    <h3>2025 год</h3>
                    <p style="color:#666; font-size:0.9rem;">Расширение территории, укрепление позиций.</p>
                </div>
                <div class="card" style="padding:1.5rem;">
                    <h3>2026 год</h3>
                    <p style="color:#666; font-size:0.9rem;">Заключение союза с Пельменский_союз.</p>
                </div>
            </div>
        </div>
    `;
}
