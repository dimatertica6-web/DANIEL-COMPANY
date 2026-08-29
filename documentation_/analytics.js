class DocumentationAnalytics {
  constructor() {
    this.data = {
      page: window.location.pathname.split('/').pop() || 'index.html',
      timestamp: new Date().toISOString(),
      modulesViewed: [],
      interactions: []
    }

    this.init()
  }

  init() {
    this.trackPageView()
    this.trackModuleViews()
    this.trackInteractions()
    this.trackPerformance()
    this.sendOnUnload()
  }

  trackPageView() {
    const data = {
      type: 'pageview',
      page: this.data.page,
      timestamp: this.data.timestamp,
      referrer: document.referrer || 'direct'
    }
    console.log('[Analytics] Page view:', data)
    this.data.interactions.push(data)
  }

  trackModuleViews() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target
            const id = section.id || 'unknown'
            const title =
              section.querySelector('h2')?.textContent?.trim() || 'Unknown'

            if (!this.data.modulesViewed.includes(id)) {
              this.data.modulesViewed.push(id)
              const event = {
                type: 'moduleview',
                module: id,
                title: title,
                timestamp: new Date().toISOString()
              }
              console.log('[Analytics] Module viewed:', event)
              this.data.interactions.push(event)
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    document.querySelectorAll('.module-section').forEach((section) => {
      observer.observe(section)
    })
  }

  trackInteractions() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest(
        'a, .module-card, .path, .badge-tag, .back-to-top, .theme-toggle'
      )
      if (!target) return

      const event = {
        type: 'click',
        element: target.tagName,
        class: target.className,
        text: target.textContent?.trim().slice(0, 50),
        timestamp: new Date().toISOString()
      }

      if (target.classList.contains('module-card')) {
        const name =
          target.querySelector('.name')?.textContent?.trim() || 'module'
        event.action = 'expand_module'
        event.target_name = name
      }

      if (target.classList.contains('path')) {
        event.action = 'copy_path'
      }

      if (target.closest('.back-to-top')) {
        event.action = 'back_to_top'
      }

      if (target.closest('.theme-toggle')) {
        event.action = 'theme_toggle'
        event.theme = document.body.classList.contains('dark-mode')
          ? 'dark'
          : 'light'
      }

      console.log('[Analytics] Interaction:', event)
      this.data.interactions.push(event)
    })

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) return
      const key = e.key
      if (['/', 'Escape', 'd', 't'].includes(key)) {
        const event = {
          type: 'keyboard',
          key: key,
          timestamp: new Date().toISOString()
        }
        console.log('[Analytics] Keyboard shortcut:', event)
        this.data.interactions.push(event)
      }
    })

    const searchInput = document.querySelector('.search-input')
    if (searchInput) {
      let searchTimeout
      searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => {
          const event = {
            type: 'search',
            query: searchInput.value,
            results: document.querySelectorAll(
              '.module-card:not([style*="display: none"])'
            ).length,
            timestamp: new Date().toISOString()
          }
          console.log('[Analytics] Search:', event)
          this.data.interactions.push(event)
        }, 500)
      })
    }
  }

  trackPerformance() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing
      const loadTime = timing.loadEventEnd - timing.navigationStart
      const domReady = timing.domContentLoadedEventEnd - timing.navigationStart

      const event = {
        type: 'performance',
        loadTime: loadTime,
        domReady: domReady,
        timestamp: new Date().toISOString()
      }
      console.log('[Analytics] Performance:', event)
      this.data.interactions.push(event)
    }
  }

  sendOnUnload() {
    window.addEventListener('beforeunload', () => {
      const sessionData = {
        page: this.data.page,
        duration: Math.round(
          (Date.now() - new Date(this.data.timestamp).getTime()) / 1000
        ),
        modulesViewed: this.data.modulesViewed.length,
        interactions: this.data.interactions.length,
        timestamp: new Date().toISOString()
      }
      console.log('[Analytics] Session end:', sessionData)

      try {
        localStorage.setItem(
          's1mple-analytics',
          JSON.stringify({
            lastSession: sessionData,
            history: JSON.parse(
              localStorage.getItem('s1mple-analytics') || '{"history":[]}'
            ).history.concat([sessionData])
          })
        )
      } catch (e) {}
    })
  }

  getReport() {
    return {
      page: this.data.page,
      viewed: this.data.modulesViewed,
      totalInteractions: this.data.interactions.length,
      timestamp: this.data.timestamp
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('s1mple-analytics-enabled') !== 'false') {
    window.analytics = new DocumentationAnalytics()
  }
})
