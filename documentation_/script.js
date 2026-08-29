document.addEventListener('DOMContentLoaded', function () {
  const sidebarLinks = document.querySelectorAll('.sidebar nav a')
  const currentPath = window.location.pathname
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1)

  sidebarLinks.forEach((link) => {
    const href = link.getAttribute('href')
    if (href && href.includes(currentPage)) {
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          sidebarLinks.forEach((a) => {
            const href = a.getAttribute('href')
            if (href && href.includes('#' + id)) {
              a.classList.add('active')
            } else {
              a.classList.remove('active')
            }
          })
        }
      })
    },
    { threshold: 0.25 }
  )

  document
    .querySelectorAll('.module-section')
    .forEach((section) => observer.observe(section))

  const searchInput = document.createElement('input')
  searchInput.type = 'text'
  searchInput.placeholder = 'Search modules...'
  searchInput.className = 'search-input'
  searchInput.style.cssText = `
    width: 100%;
    padding: 0.6rem 1rem;
    border: 1px solid #e6ecf4;
    border-radius: 12px;
    font-size: 0.9rem;
    background: #f8fafd;
    margin-bottom: 1rem;
    outline: none;
    transition: 0.2s;
  `
  searchInput.addEventListener('focus', function () {
    this.style.borderColor = '#1e2b3e'
    this.style.background = '#ffffff'
  })
  searchInput.addEventListener('blur', function () {
    this.style.borderColor = '#e6ecf4'
    this.style.background = '#f8fafd'
  })

  const sidebarNav = document.querySelector('.sidebar nav')
  const sidebarUl = sidebarNav.querySelector('ul')
  sidebarUl.parentNode.insertBefore(searchInput, sidebarUl)

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim()
    const links = sidebarUl.querySelectorAll('li:not(.category)')
    const categories = sidebarUl.querySelectorAll('.category')

    links.forEach((link) => {
      const a = link.querySelector('a')
      if (a) {
        const text = a.textContent.toLowerCase()
        const href = a.getAttribute('href') || ''
        if (text.includes(query) || href.includes(query)) {
          link.style.display = ''
        } else {
          link.style.display = 'none'
        }
      }
    })

    categories.forEach((cat) => {
      const nextLinks = cat.nextElementSibling
      let hasVisible = false
      let sibling = cat.nextElementSibling
      while (sibling && !sibling.classList.contains('category')) {
        if (sibling.style.display !== 'none') {
          hasVisible = true
          break
        }
        sibling = sibling.nextElementSibling
      }
      cat.style.display = hasVisible ? '' : 'none'
    })
  })

  const moduleCards = document.querySelectorAll('.module-card')
  const statsDiv = document.createElement('div')
  statsDiv.className = 'module-stats'
  statsDiv.style.cssText = `
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    padding: 0.8rem 0;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    color: #4b5a72;
    border-bottom: 1px solid #eef3f9;
  `
  const totalModules = moduleCards.length
  const totalSections = document.querySelectorAll('.module-section').length
  statsDiv.innerHTML = `
    <span>📦 Modules: <strong>${totalModules}</strong></span>
    <span>📄 Sections: <strong>${totalSections}</strong></span>
    <span>🔍 Search above to filter</span>
  `
  const descElements = document.querySelectorAll('.module-section .desc')
  if (descElements.length > 0) {
    descElements[0].parentNode.insertBefore(statsDiv, descElements[0])
  }

  const style = document.createElement('style')
  style.textContent = `
    .module-card.highlight {
      animation: pulse-highlight 0.6s ease;
      border-color: #1e2b3e;
      background: #f0f5ff;
    }
    @keyframes pulse-highlight {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); background: #e8f0fe; }
      100% { transform: scale(1); }
    }
    .module-card .badge-tag {
      display: inline-block;
      font-size: 0.6rem;
      background: #eef1f7;
      padding: 0.1rem 0.5rem;
      border-radius: 20px;
      color: #5b6a82;
      margin-left: 0.5rem;
    }
    .module-card .path {
      cursor: pointer;
      transition: 0.15s;
    }
    .module-card .path:hover {
      background: #dce6f2;
      color: #0a0e18;
    }
    .toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #1e2b3e;
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: 12px;
      font-size: 0.9rem;
      opacity: 0;
      transform: translateY(20px);
      transition: 0.3s;
      z-index: 999;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }
    .sidebar .category.hidden-category {
      display: none !important;
    }
    .sidebar nav li.hidden-item {
      display: none !important;
    }
    .back-to-top {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      background: #ffffff;
      border: 1px solid #e6ecf4;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      transition: 0.2s;
      opacity: 0;
      pointer-events: none;
      z-index: 999;
    }
    .back-to-top.show {
      opacity: 1;
      pointer-events: auto;
    }
    .back-to-top:hover {
      background: #f2f5fa;
      border-color: #cbd4e2;
      transform: translateY(-2px);
    }
    .back-to-top svg {
      width: 20px;
      height: 20px;
      stroke: #1e2535;
    }
    .theme-toggle {
      position: fixed;
      top: 1.2rem;
      right: 1.2rem;
      background: #ffffff;
      border: 1px solid #e6ecf4;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      transition: 0.2s;
      z-index: 999;
    }
    .theme-toggle:hover {
      background: #f2f5fa;
      border-color: #cbd4e2;
    }
    .theme-toggle svg {
      width: 20px;
      height: 20px;
      stroke: #1e2535;
    }
    body.dark-mode {
      background: #12161e;
      color: #e8edf5;
    }
    body.dark-mode header {
      background: #1a1f2a;
      border-color: #2a3140;
    }
    body.dark-mode .sidebar {
      background: #1a1f2a;
      border-color: #2a3140;
    }
    body.dark-mode .sidebar nav a {
      color: #b0bcca;
    }
    body.dark-mode .sidebar nav a:hover {
      background: #252d3d;
      color: #ffffff;
    }
    body.dark-mode .sidebar nav a.active {
      background: #252d3d;
      color: #ffffff;
      border-left-color: #6a8aaa;
    }
    body.dark-mode .module-section {
      background: #1a1f2a;
      border-color: #2a3140;
    }
    body.dark-mode .module-section .desc {
      background: #1f2633;
      border-left-color: #3a4559;
    }
    body.dark-mode .module-card {
      background: #1f2633;
      border-color: #2a3140;
    }
    body.dark-mode .module-card:hover {
      background: #252d3d;
      border-color: #3a4559;
    }
    body.dark-mode .module-card .path {
      background: #252d3d;
    }
    body.dark-mode .footer {
      background: #1a1f2a;
      border-color: #2a3140;
    }
    body.dark-mode .badge a {
      background: #252d3d;
      border-color: #2a3140;
      color: #b0bcca;
    }
    body.dark-mode .badge a:hover {
      background: #2e374a;
    }
    body.dark-mode .search-input {
      background: #1f2633;
      border-color: #2a3140;
      color: #e8edf5;
    }
    body.dark-mode .search-input:focus {
      background: #252d3d;
      border-color: #4a5a7a;
    }
    body.dark-mode .theme-toggle {
      background: #1a1f2a;
      border-color: #2a3140;
    }
    body.dark-mode .theme-toggle svg {
      stroke: #b0bcca;
    }
    body.dark-mode .back-to-top {
      background: #1a1f2a;
      border-color: #2a3140;
    }
    body.dark-mode .back-to-top svg {
      stroke: #b0bcca;
    }
    body.dark-mode .module-stats {
      color: #8a9aaa;
      border-color: #2a3140;
    }
    body.dark-mode .toast {
      background: #2a3140;
    }
  `
  document.head.appendChild(style)

  const backToTop = document.createElement('div')
  backToTop.className = 'back-to-top'
  backToTop.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `
  document.body.appendChild(backToTop)

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      backToTop.classList.add('show')
    } else {
      backToTop.classList.remove('show')
    }
  })

  const themeToggle = document.createElement('div')
  themeToggle.className = 'theme-toggle'
  themeToggle.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  `
  document.body.appendChild(themeToggle)

  let darkMode = localStorage.getItem('s1mple-dark') === 'true'
  if (darkMode) {
    document.body.classList.add('dark-mode')
    themeToggle.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    `
  }

  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode')
    const isDark = document.body.classList.contains('dark-mode')
    localStorage.setItem('s1mple-dark', isDark)
    if (isDark) {
      this.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      `
    } else {
      this.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      `
    }
  })

  document.querySelectorAll('.path').forEach((el) => {
    el.addEventListener('click', function (e) {
      e.stopPropagation()
      const text = this.textContent.trim()
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showToast(`📋 Copied: ${text}`)
        })
        .catch(() => {
          showToast(`📋 Path: ${text}`)
        })
    })
  })

  function showToast(message) {
    const existing = document.querySelector('.toast')
    if (existing) existing.remove()

    const toast = document.createElement('div')
    toast.className = 'toast'
    toast.textContent = message
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.classList.add('show')
    }, 50)

    setTimeout(() => {
      toast.classList.remove('show')
      setTimeout(() => {
        toast.remove()
      }, 300)
    }, 2500)
  }

  const keyboardShortcuts = {
    '/': function (e) {
      if (e.target.tagName !== 'INPUT') {
        e.preventDefault()
        searchInput.focus()
      }
    },
    Escape: function () {
      searchInput.blur()
      searchInput.value = ''
      searchInput.dispatchEvent(new Event('input'))
    },
    d: function () {
      document.body.classList.toggle('dark-mode')
      const isDark = document.body.classList.contains('dark-mode')
      localStorage.setItem('s1mple-dark', isDark)
      themeToggle.click()
    },
    t: function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

    if (e.key in keyboardShortcuts) {
      e.preventDefault()
      keyboardShortcuts[e.key](e)
    }
  })

  console.log(
    '%c S1mple Documentation v6.0 ',
    'background: #1e2b3e; color: white; font-size: 16px; padding: 8px 16px; border-radius: 6px;'
  )
  console.log(
    '%c Keyboard shortcuts: / search | Esc clear | d dark mode | t top ',
    'color: #6a7b95; font-size: 12px;'
  )

  let loaded = false
  document.querySelectorAll('.module-card .desc-full').forEach((desc, i) => {
    if (desc.textContent.trim().length < 30) {
      desc.textContent =
        'Full description available in the source code. This module provides essential functionality for the S1mple framework.'
    }
  })

  const tagColors = {
    core: '#3b4a6a',
    attacks: '#c0392b',
    recon: '#2980b9',
    persistence: '#8e44ad',
    stealth: '#27ae60',
    botnet: '#d35400',
    utility: '#7f8c8d',
    data: '#16a085'
  }

  document.querySelectorAll('.module-card').forEach((card) => {
    const pathEl = card.querySelector('.path')
    if (pathEl) {
      const path = pathEl.textContent
      let tag = 'utility'
      if (path.includes('core')) tag = 'core'
      else if (path.includes('attack')) tag = 'attacks'
      else if (path.includes('recon')) tag = 'recon'
      else if (path.includes('persist')) tag = 'persistence'
      else if (path.includes('stealth')) tag = 'stealth'
      else if (path.includes('botnet')) tag = 'botnet'
      else if (path.includes('data')) tag = 'data'

      const badge = document.createElement('span')
      badge.className = 'badge-tag'
      badge.textContent = tag
      badge.style.background = tagColors[tag] || '#7f8c8d'
      badge.style.color = 'white'
      badge.style.padding = '0.1rem 0.5rem'
      badge.style.borderRadius = '20px'
      badge.style.fontSize = '0.55rem'
      badge.style.textTransform = 'uppercase'
      badge.style.letterSpacing = '0.04em'
      badge.style.marginLeft = '0.5rem'

      const nameEl = card.querySelector('.name')
      if (nameEl) {
        nameEl.appendChild(badge)
      }
    }
  })

  console.log(
    `%c 📄 ${document.querySelectorAll('.module-section').length} sections · ${document.querySelectorAll('.module-card').length} modules loaded`,
    'color: #4b5a72; font-size: 12px;'
  )
})
