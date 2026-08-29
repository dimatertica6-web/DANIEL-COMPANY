class DocumentationNavigation {
  constructor() {
    this.currentPage = window.location.pathname.split('/').pop() || 'index.html'
    this.sidebar = document.querySelector('.sidebar')
    this.main = document.querySelector('.main')
    this.init()
  }

  init() {
    this.highlightCurrentLink()
    this.setupBreadcrumbs()
    this.setupSmoothScroll()
    this.setupPageTransitions()
    this.setupResponsiveSidebar()
  }

  highlightCurrentLink() {
    const links = this.sidebar?.querySelectorAll('a') || []
    links.forEach((link) => {
      const href = link.getAttribute('href')
      if (href && href.includes(this.currentPage)) {
        link.classList.add('active')
      }
    })
  }

  setupBreadcrumbs() {
    const breadcrumb = document.createElement('div')
    breadcrumb.className = 'breadcrumb'
    breadcrumb.style.cssText = `
      font-size: 0.8rem;
      color: #6a7b95;
      padding: 0.5rem 0 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    `

    const pageName = this.currentPage.replace('.html', '')
    const parts = pageName.split('_')
    const displayName = parts
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ')

    breadcrumb.innerHTML = `
      <a href="../index.html" style="color: #1e2b3e; text-decoration: none;">🏠 Home</a>
      <span style="color: #aab5c8;">›</span>
      <span style="font-weight: 500; color: #1e2b3e;">${displayName || 'Documentation'}</span>
    `

    const header = document.querySelector('header')
    if (header) {
      header.parentNode.insertBefore(breadcrumb, header.nextSibling)
    }
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href')
        if (targetId === '#') return
        const target = document.querySelector(targetId)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          history.pushState(null, null, targetId)
        }
      })
    })
  }

  setupPageTransitions() {
    document.querySelectorAll('.sidebar nav a').forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href')
        if (href && !href.startsWith('#')) {
          e.preventDefault()
          const mainContent = document.querySelector('.main')
          if (mainContent) {
            mainContent.style.opacity = '0'
            mainContent.style.transform = 'translateY(8px)'
            mainContent.style.transition = 'opacity 0.2s, transform 0.2s'
          }

          setTimeout(() => {
            window.location.href = href
          }, 200)
        }
      })
    })

    const mainContent = document.querySelector('.main')
    if (mainContent) {
      mainContent.style.opacity = '0'
      setTimeout(() => {
        mainContent.style.transition = 'opacity 0.3s, transform 0.3s'
        mainContent.style.opacity = '1'
        mainContent.style.transform = 'translateY(0)'
      }, 100)
    }
  }

  setupResponsiveSidebar() {
    const toggleBtn = document.createElement('button')
    toggleBtn.className = 'sidebar-toggle'
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px;">
        <path d="M3 12h18M3 6h18M3 18h18"/>
      </svg>
    `
    toggleBtn.style.cssText = `
      display: none;
      position: fixed;
      bottom: 5rem;
      left: 1.5rem;
      background: #ffffff;
      border: 1px solid #e6ecf4;
      border-radius: 12px;
      padding: 0.6rem;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      z-index: 998;
      transition: 0.2s;
    `
    toggleBtn.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar')
      if (sidebar) {
        const isVisible = sidebar.style.display !== 'none'
        sidebar.style.display = isVisible ? 'none' : ''
        toggleBtn.innerHTML = isVisible
          ? `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px;">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        `
          : `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px;">
            <path d="M6 18L18 6M6 6l12 12"/>
          </svg>
        `
      }
    })

    const checkWidth = () => {
      if (window.innerWidth < 860) {
        toggleBtn.style.display = 'block'
        const sidebar = document.querySelector('.sidebar')
        if (sidebar) {
          sidebar.style.display = 'none'
        }
      } else {
        toggleBtn.style.display = 'none'
        const sidebar = document.querySelector('.sidebar')
        if (sidebar) {
          sidebar.style.display = ''
        }
      }
    }

    checkWidth()
    window.addEventListener('resize', checkWidth)
    document.body.appendChild(toggleBtn)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  window.navigation = new DocumentationNavigation()
})
