;(function () {
  'use strict'

  const GlanderIO = {
    version: '3.0.0',
    build: '2026.02.09',
    author: 'Lamskov Daniel',
    company: 'Swill Way',
    name: 'GlanderIO'
  }

  const UI = {
    init: function () {
      console.log(`GlanderIO v${GlanderIO.version} loaded (${GlanderIO.build})`)
      this.setupNavigation()
      this.setupSidebar()
      this.setupSearch()
      this.setupCopyButtons()
      this.setupSmoothScroll()
      this.setupThemeToggle()
      this.setupMobileMenu()
      this.setupBackToTop()
      this.setupKeyboardShortcuts()
      this.setupCodeHighlighting()
      this.setupTableResponsive()
      this.setupCollapsibleSections()
      this.setupTabs()
      this.setupTooltips()
      this.setupModals()
      this.setupCarousel()
      this.setupAccordion()
      this.setupDropdowns()
      this.setupNotifications()
      this.setupLoadingStates()
      this.setupFormValidation()
      this.setupPagination()
      this.setupSortingTables()
      this.setupFilteringTables()
      this.setupSearchBar()
      this.setupScrollSpy()
      this.setupPrintStyles()
      this.setupLanguageSwitcher()
      this.setupFeedbackButtons()
      this.setupShareButtons()
      this.setupReadingProgress()
      this.setupTableOfContents()
      this.setupFootnotes()
      this.setupGlossary()
      this.setupIndexSearch()
      this.setupTagFiltering()
      this.setupDateFiltering()
      this.setupExportButtons()
      this.setupThemeSwitcher()
      this.setupAnalytics()
      this.setupCookieConsent()
      this.setupMaintenanceMode()
      this.setupVersionInfo()
      this.setupBuildInfo()
      this.setupFooterLinks()
      this.setupNavSearch()
      this.setupQuickLinks()
      this.setupBreadcrumbs()
      this.setupLastUpdated()
      this.setupTableSearch()
      this.setupAccordionToggle()
      this.setupTabSystem()
      this.setupScrollTop()
      this.setupSidebarToggle()
      this.setupMobileNavToggle()
      this.setupSearchShortcut()
      this.setupThemePreference()
    },

    setupNavigation: function () {
      const navLinks = document.querySelectorAll('.nav-links a')
      const currentUrl = window.location.pathname

      navLinks.forEach((link) => {
        link.classList.remove('active')
        const href = link.getAttribute('href')
        if (
          href === currentUrl.split('/').pop() ||
          (currentUrl === '/' && href === 'index.html') ||
          (href === '' && currentUrl.endsWith('/'))
        ) {
          link.classList.add('active')
        }
        link.addEventListener('click', function (e) {
          document
            .querySelectorAll('.nav-links a')
            .forEach((l) => l.classList.remove('active'))
          this.classList.add('active')
        })
      })
    },

    setupSidebar: function () {
      const sidebarLinks = document.querySelectorAll('.sidebar a')
      const currentUrl = window.location.pathname

      sidebarLinks.forEach((link) => {
        link.classList.remove('active')
        if (link.getAttribute('href') === currentUrl.split('/').pop()) {
          link.classList.add('active')
        }
        link.addEventListener('click', function (e) {
          sidebarLinks.forEach((l) => l.classList.remove('active'))
          this.classList.add('active')
        })
      })
    },

    setupSearch: function () {
      const searchInput = document.getElementById('searchInput')
      if (!searchInput) return

      let searchTimeout

      searchInput.addEventListener('input', function (e) {
        clearTimeout(searchTimeout)
        const query = this.value.trim()
        if (query.length < 2) return
        searchTimeout = setTimeout(() => {
          performSearch(query)
        }, 300)
      })

      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          this.value = ''
          this.blur()
        }
      })

      function performSearch(query) {
        const items = document.querySelectorAll('.searchable')
        let found = 0
        items.forEach((item) => {
          const text = item.textContent.toLowerCase()
          if (text.includes(query.toLowerCase())) {
            item.style.display = ''
            found++
          } else {
            item.style.display = 'none'
          }
        })
        const resultsDiv = document.getElementById('searchResults')
        if (resultsDiv) {
          resultsDiv.textContent =
            found > 0 ? `Found ${found} results` : 'No results found'
          resultsDiv.style.display = 'block'
          setTimeout(() => {
            resultsDiv.style.display = 'none'
          }, 3000)
        }
      }
    },

    setupCopyButtons: function () {
      document.querySelectorAll('.copy-btn').forEach((btn) => {
        btn.addEventListener('click', function (e) {
          const code = this.parentElement.querySelector('code')
          if (code) {
            navigator.clipboard.writeText(code.textContent).then(() => {
              this.textContent = 'Copied!'
              setTimeout(() => {
                this.textContent = 'Copy'
              }, 2000)
            })
          }
        })
      })
    },

    setupSmoothScroll: function () {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          const target = document.querySelector(this.getAttribute('href'))
          if (target) {
            e.preventDefault()
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        })
      })
    },

    setupThemeToggle: function () {
      const toggle = document.getElementById('themeToggle')
      if (!toggle) return

      const currentTheme = localStorage.getItem('glander-theme') || 'light'
      document.body.className = currentTheme

      toggle.addEventListener('click', function () {
        const newTheme = document.body.className === 'dark' ? 'light' : 'dark'
        document.body.className = newTheme
        localStorage.setItem('glander-theme', newTheme)
      })
    },

    setupMobileMenu: function () {
      const menuToggle = document.getElementById('mobileMenuToggle')
      const navLinks = document.querySelector('.nav-links')

      if (!menuToggle) return

      menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open')
        this.classList.toggle('active')
      })

      document.addEventListener('click', function (e) {
        if (!e.target.closest('.navbar')) {
          navLinks.classList.remove('open')
          menuToggle.classList.remove('active')
        }
      })
    },

    setupBackToTop: function () {
      const btn = document.getElementById('backToTop')
      if (!btn) return

      window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
          btn.style.display = 'flex'
        } else {
          btn.style.display = 'none'
        }
      })

      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    },

    setupKeyboardShortcuts: function () {
      document.addEventListener('keydown', function (e) {
        if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault()
          const search = document.getElementById('searchInput')
          if (search) search.focus()
        }
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
          const search = document.getElementById('searchInput')
          if (search && document.activeElement !== search) {
            e.preventDefault()
            search.focus()
          }
        }
        if (e.key === 'Escape') {
          const search = document.getElementById('searchInput')
          if (search) search.blur()
        }
        if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault()
          const toggle = document.getElementById('themeToggle')
          if (toggle) toggle.click()
        }
      })
    },

    setupCodeHighlighting: function () {
      document.querySelectorAll('pre code').forEach((block) => {
        if (typeof hljs !== 'undefined') {
          hljs.highlightElement(block)
        }
      })
    },

    setupTableResponsive: function () {
      document.querySelectorAll('table').forEach((table) => {
        const wrapper = document.createElement('div')
        wrapper.className = 'table-responsive'
        table.parentNode.insertBefore(wrapper, table)
        wrapper.appendChild(table)
      })
    },

    setupCollapsibleSections: function () {
      document.querySelectorAll('.collapsible-header').forEach((header) => {
        header.addEventListener('click', function () {
          const content = this.nextElementSibling
          if (content) {
            content.style.display =
              content.style.display === 'none' ? 'block' : 'none'
            this.classList.toggle('collapsed')
          }
        })
      })
    },

    setupTabs: function () {
      document.querySelectorAll('.tabs-container').forEach((container) => {
        const tabs = container.querySelectorAll('.tab')
        const panes = container.querySelectorAll('.tab-pane')

        tabs.forEach((tab) => {
          tab.addEventListener('click', function () {
            tabs.forEach((t) => t.classList.remove('active'))
            this.classList.add('active')
            const target = this.dataset.target
            panes.forEach((pane) => {
              pane.classList.remove('active')
              if (pane.id === target) {
                pane.classList.add('active')
              }
            })
          })
        })
      })
    },

    setupTooltips: function () {
      document.querySelectorAll('[data-tooltip]').forEach((el) => {
        el.addEventListener('mouseenter', function (e) {
          const tooltip = document.createElement('div')
          tooltip.className = 'tooltip'
          tooltip.textContent = this.dataset.tooltip
          document.body.appendChild(tooltip)
          const rect = this.getBoundingClientRect()
          tooltip.style.top = rect.bottom + 10 + 'px'
          tooltip.style.left =
            rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px'
          this._tooltip = tooltip
        })
        el.addEventListener('mouseleave', function () {
          if (this._tooltip) {
            this._tooltip.remove()
            this._tooltip = null
          }
        })
      })
    },

    setupModals: function () {
      document.querySelectorAll('[data-modal]').forEach((btn) => {
        btn.addEventListener('click', function () {
          const modalId = this.dataset.modal
          const modal = document.getElementById(modalId)
          if (modal) {
            modal.style.display = 'flex'
            setTimeout(() => {
              modal.classList.add('active')
            }, 10)
          }
        })
      })

      document.querySelectorAll('.modal-close').forEach((btn) => {
        btn.addEventListener('click', function () {
          const modal = this.closest('.modal')
          if (modal) {
            modal.classList.remove('active')
            setTimeout(() => {
              modal.style.display = 'none'
            }, 300)
          }
        })
      })

      document.querySelectorAll('.modal').forEach((modal) => {
        modal.addEventListener('click', function (e) {
          if (e.target === this) {
            this.classList.remove('active')
            setTimeout(() => {
              this.style.display = 'none'
            }, 300)
          }
        })
      })
    },

    setupCarousel: function () {
      document.querySelectorAll('.carousel').forEach((carousel) => {
        let current = 0
        const slides = carousel.querySelectorAll('.carousel-slide')
        const total = slides.length

        if (total === 0) return

        const prevBtn = carousel.querySelector('.carousel-prev')
        const nextBtn = carousel.querySelector('.carousel-next')

        function showSlide(index) {
          slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none'
          })
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', function () {
            current = (current - 1 + total) % total
            showSlide(current)
          })
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', function () {
            current = (current + 1) % total
            showSlide(current)
          })
        }

        showSlide(0)
      })
    },

    setupAccordion: function () {
      document.querySelectorAll('.accordion-item').forEach((item) => {
        const header = item.querySelector('.accordion-header')
        const body = item.querySelector('.accordion-body')

        if (header && body) {
          header.addEventListener('click', function () {
            const isOpen = body.style.display !== 'none'
            body.style.display = isOpen ? 'none' : 'block'
            this.classList.toggle('active')
          })
        }
      })
    },

    setupDropdowns: function () {
      document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
        toggle.addEventListener('click', function (e) {
          e.stopPropagation()
          const menu = this.nextElementSibling
          if (menu && menu.classList.contains('dropdown-menu')) {
            menu.style.display =
              menu.style.display === 'block' ? 'none' : 'block'
          }
        })
      })

      document.addEventListener('click', function () {
        document.querySelectorAll('.dropdown-menu').forEach((menu) => {
          menu.style.display = 'none'
        })
      })
    },

    setupNotifications: function () {
      const container = document.getElementById('notificationContainer')
      if (!container) return

      window.showNotification = function (message, type = 'info') {
        const notification = document.createElement('div')
        notification.className = `notification notification-${type}`
        notification.textContent = message

        const closeBtn = document.createElement('button')
        closeBtn.textContent = '×'
        closeBtn.className = 'notification-close'
        closeBtn.addEventListener('click', function () {
          notification.remove()
        })

        notification.appendChild(closeBtn)
        container.appendChild(notification)

        setTimeout(() => {
          notification.classList.add('show')
        }, 10)

        setTimeout(() => {
          notification.classList.remove('show')
          setTimeout(() => notification.remove(), 300)
        }, 5000)
      }
    },

    setupLoadingStates: function () {
      document.querySelectorAll('[data-loading]').forEach((el) => {
        el.addEventListener('click', function () {
          this.disabled = true
          this.textContent = 'Loading...'
          const originalText = this.dataset.original || 'Submit'
          setTimeout(() => {
            this.disabled = false
            this.textContent = originalText
          }, 2000)
        })
      })
    },

    setupFormValidation: function () {
      document.querySelectorAll('form[data-validate]').forEach((form) => {
        form.addEventListener('submit', function (e) {
          let valid = true
          const inputs = this.querySelectorAll('[required]')
          inputs.forEach((input) => {
            if (!input.value.trim()) {
              valid = false
              input.classList.add('error')
              const error = document.createElement('span')
              error.className = 'error-message'
              error.textContent = 'This field is required'
              input.parentNode.appendChild(error)
            } else {
              input.classList.remove('error')
              const error = input.parentNode.querySelector('.error-message')
              if (error) error.remove()
            }
          })
          if (!valid) e.preventDefault()
        })
      })
    },

    setupPagination: function () {
      document.querySelectorAll('.pagination').forEach((pagination) => {
        const items = pagination.querySelectorAll('.page-item')
        items.forEach((item) => {
          item.addEventListener('click', function () {
            items.forEach((i) => i.classList.remove('active'))
            this.classList.add('active')
          })
        })
      })
    },

    setupSortingTables: function () {
      document.querySelectorAll('[data-sort]').forEach((header) => {
        header.addEventListener('click', function () {
          const table = this.closest('table')
          if (!table) return
          const tbody = table.querySelector('tbody')
          if (!tbody) return
          const index = Array.from(this.parentElement.children).indexOf(this)
          const rows = Array.from(tbody.children)
          const asc = this.dataset.sort === 'asc'
          rows.sort((a, b) => {
            const aText = a.children[index].textContent.trim()
            const bText = b.children[index].textContent.trim()
            const aNum = parseFloat(aText)
            const bNum = parseFloat(bText)
            if (!isNaN(aNum) && !isNaN(bNum)) {
              return asc ? aNum - bNum : bNum - aNum
            }
            return asc ? aText.localeCompare(bText) : bText.localeCompare(aText)
          })
          rows.forEach((row) => tbody.appendChild(row))
          this.dataset.sort = asc ? 'desc' : 'asc'
        })
      })
    },

    setupFilteringTables: function () {
      document.querySelectorAll('[data-filter]').forEach((input) => {
        input.addEventListener('input', function () {
          const table = this.closest('table')
          if (!table) return
          const tbody = table.querySelector('tbody')
          if (!tbody) return
          const filter = this.value.toLowerCase()
          const rows = tbody.querySelectorAll('tr')
          rows.forEach((row) => {
            const text = row.textContent.toLowerCase()
            row.style.display = text.includes(filter) ? '' : 'none'
          })
        })
      })
    },

    setupSearchBar: function () {
      const searchBar = document.querySelector('.search-bar input')
      if (searchBar) {
        const container = searchBar.parentElement
        const clearBtn = document.createElement('button')
        clearBtn.textContent = '×'
        clearBtn.className = 'search-clear'
        clearBtn.style.display = 'none'
        container.appendChild(clearBtn)

        searchBar.addEventListener('input', function () {
          clearBtn.style.display = this.value ? 'block' : 'none'
        })

        clearBtn.addEventListener('click', function () {
          searchBar.value = ''
          searchBar.dispatchEvent(new Event('input'))
          searchBar.focus()
        })
      }
    },

    setupScrollSpy: function () {
      const sections = document.querySelectorAll('section[id]')
      const navLinks = document.querySelectorAll('.sidebar a')

      if (sections.length === 0 || navLinks.length === 0) return

      window.addEventListener('scroll', function () {
        let current = ''
        sections.forEach((section) => {
          const top = section.offsetTop - 100
          if (window.scrollY >= top) {
            current = section.id
          }
        })
        navLinks.forEach((link) => {
          link.classList.remove('active')
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active')
          }
        })
      })
    },

    setupPrintStyles: function () {
      const printBtn = document.getElementById('printBtn')
      if (printBtn) {
        printBtn.addEventListener('click', function () {
          window.print()
        })
      }
    },

    setupLanguageSwitcher: function () {
      const switcher = document.getElementById('languageSwitcher')
      if (!switcher) return

      switcher.addEventListener('change', function () {
        const lang = this.value
        localStorage.setItem('glander-lang', lang)
        window.location.reload()
      })

      const savedLang = localStorage.getItem('glander-lang')
      if (savedLang) {
        switcher.value = savedLang
      }
    },

    setupFeedbackButtons: function () {
      document.querySelectorAll('[data-feedback]').forEach((btn) => {
        btn.addEventListener('click', function () {
          const type = this.dataset.feedback
          const parent = this.closest('.feedback-container')
          if (parent) {
            parent
              .querySelectorAll('[data-feedback]')
              .forEach((b) => b.classList.remove('selected'))
            this.classList.add('selected')
            const message = parent.querySelector('.feedback-message')
            if (message) {
              message.textContent = `Thank you for your ${type} feedback!`
              message.style.display = 'block'
              setTimeout(() => {
                message.style.display = 'none'
              }, 3000)
            }
          }
        })
      })
    },

    setupShareButtons: function () {
      document.querySelectorAll('[data-share]').forEach((btn) => {
        btn.addEventListener('click', function () {
          const platform = this.dataset.share
          const url = window.location.href
          const title = document.title
          let shareUrl = ''
          switch (platform) {
            case 'twitter':
              shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
              break
            case 'facebook':
              shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
              break
            case 'linkedin':
              shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
              break
            case 'email':
              shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
              break
          }
          if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400')
          }
        })
      })
    },

    setupReadingProgress: function () {
      const progressBar = document.getElementById('readingProgress')
      if (!progressBar) return

      window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
        progressBar.style.width = `${progress}%`
      })
    },

    setupTableOfContents: function () {
      const toc = document.getElementById('toc')
      if (!toc) return

      const headings = document.querySelectorAll('h1, h2, h3')
      let html = '<ul>'
      headings.forEach((heading) => {
        if (!heading.id) {
          heading.id = heading.textContent
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
        }
        const level = parseInt(heading.tagName[1])
        const indent = (level - 1) * 16
        html += `<li style="padding-left:${indent}px"><a href="#${heading.id}">${heading.textContent}</a></li>`
      })
      html += '</ul>'
      toc.innerHTML = html

      toc.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', function (e) {
          e.preventDefault()
          const target = document.querySelector(this.getAttribute('href'))
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
          }
        })
      })
    },

    setupFootnotes: function () {
      const footnotes = document.querySelectorAll('.footnote')
      footnotes.forEach((fn, index) => {
        const number = document.createElement('sup')
        number.className = 'footnote-number'
        number.textContent = `[${index + 1}]`
        fn.parentNode.insertBefore(number, fn)
      })
    },

    setupGlossary: function () {
      const terms = document.querySelectorAll('.glossary-term')
      terms.forEach((term) => {
        const definition = term.dataset.definition
        if (definition) {
          term.addEventListener('click', function () {
            const def = document.createElement('div')
            def.className = 'glossary-definition'
            def.textContent = definition
            this.appendChild(def)
            setTimeout(() => {
              def.remove()
            }, 3000)
          })
        }
      })
    },

    setupIndexSearch: function () {
      const indexSearch = document.getElementById('indexSearch')
      if (!indexSearch) return

      const items = document.querySelectorAll('.index-item')
      indexSearch.addEventListener('input', function () {
        const query = this.value.toLowerCase()
        items.forEach((item) => {
          const text = item.textContent.toLowerCase()
          item.style.display = text.includes(query) ? '' : 'none'
        })
      })
    },

    setupTagFiltering: function () {
      document.querySelectorAll('[data-tag]').forEach((btn) => {
        btn.addEventListener('click', function () {
          const tag = this.dataset.tag
          const items = document.querySelectorAll('.tagged-item')
          items.forEach((item) => {
            const tags = item.dataset.tags ? item.dataset.tags.split(',') : []
            item.style.display = tags.includes(tag) ? '' : 'none'
          })
          document
            .querySelectorAll('[data-tag]')
            .forEach((b) => b.classList.remove('active'))
          this.classList.add('active')
        })
      })
    },

    setupDateFiltering: function () {
      const dateFilter = document.getElementById('dateFilter')
      if (!dateFilter) return

      const items = document.querySelectorAll('.dated-item')
      dateFilter.addEventListener('change', function () {
        const filter = this.value
        items.forEach((item) => {
          const date = new Date(item.dataset.date)
          const now = new Date()
          let show = false
          switch (filter) {
            case 'today':
              show = date.toDateString() === now.toDateString()
              break
            case 'week':
              const weekAgo = new Date(now)
              weekAgo.setDate(weekAgo.getDate() - 7)
              show = date >= weekAgo
              break
            case 'month':
              const monthAgo = new Date(now)
              monthAgo.setMonth(monthAgo.getMonth() - 1)
              show = date >= monthAgo
              break
            default:
              show = true
          }
          item.style.display = show ? '' : 'none'
        })
      })
    },

    setupExportButtons: function () {
      document.querySelectorAll('[data-export]').forEach((btn) => {
        btn.addEventListener('click', function () {
          const type = this.dataset.export
          const table = this.closest('table')
          if (!table) return
          let data = ''
          if (type === 'csv') {
            data = this.exportTableToCSV(table)
          } else if (type === 'json') {
            data = this.exportTableToJSON(table)
          }
          if (data) {
            const blob = new Blob([data], { type: 'text/plain' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `export.${type}`
            a.click()
            URL.revokeObjectURL(url)
          }
        })
      })
    },

    exportTableToCSV: function (table) {
      const rows = table.querySelectorAll('tr')
      let csv = ''
      rows.forEach((row) => {
        const cells = row.querySelectorAll('td, th')
        const rowData = Array.from(cells).map(
          (cell) => `"${cell.textContent.trim()}"`
        )
        csv += rowData.join(',') + '\n'
      })
      return csv
    },

    exportTableToJSON: function (table) {
      const headers = []
      const headerRow = table.querySelector('thead tr')
      if (headerRow) {
        headerRow
          .querySelectorAll('th')
          .forEach((th) => headers.push(th.textContent.trim()))
      }
      const data = []
      const bodyRows = table.querySelectorAll('tbody tr')
      bodyRows.forEach((row) => {
        const rowData = {}
        row.querySelectorAll('td').forEach((td, i) => {
          rowData[headers[i] || `col${i}`] = td.textContent.trim()
        })
        data.push(rowData)
      })
      return JSON.stringify(data, null, 2)
    },

    setupThemeSwitcher: function () {
      const switcher = document.getElementById('themeSwitcher')
      if (switcher) {
        switcher.addEventListener('change', function () {
          const theme = this.value
          document.body.className = theme
          localStorage.setItem('glander-theme', theme)
        })
      }
    },

    setupAnalytics: function () {
      if (window.gtag) {
        document.querySelectorAll('[data-track]').forEach((el) => {
          el.addEventListener('click', function () {
            const event = this.dataset.track
            gtag('event', event, {
              event_category: 'engagement',
              event_label: this.textContent.trim()
            })
          })
        })
      }
    },

    setupCookieConsent: function () {
      const consent = localStorage.getItem('glander-cookie-consent')
      if (consent) return

      const banner = document.createElement('div')
      banner.className = 'cookie-consent'
      banner.innerHTML = `
                <p>We use cookies to enhance your experience. <a href="/privacy.html">Learn more</a></p>
                <button class="btn btn-primary" onclick="acceptCookies()">Accept</button>
            `
      document.body.appendChild(banner)

      window.acceptCookies = function () {
        localStorage.setItem('glander-cookie-consent', 'true')
        banner.remove()
      }
    },

    setupMaintenanceMode: function () {
      const maintenance = document.querySelector('.maintenance-mode')
      if (maintenance) {
        const countdown = maintenance.querySelector('.countdown')
        if (countdown) {
          let time = parseInt(countdown.dataset.time) || 3600
          const timer = setInterval(() => {
            const hours = Math.floor(time / 3600)
            const minutes = Math.floor((time % 3600) / 60)
            const seconds = time % 60
            countdown.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            time--
            if (time < 0) clearInterval(timer)
          }, 1000)
        }
      }
    },

    setupVersionInfo: function () {
      const versionEl = document.getElementById('versionInfo')
      if (versionEl) {
        versionEl.textContent = `GlanderIO v${GlanderIO.version}`
      }
    },

    setupBuildInfo: function () {
      const buildEl = document.getElementById('buildInfo')
      if (buildEl) {
        buildEl.textContent = `Built: ${GlanderIO.build}`
      }
    },

    setupFooterLinks: function () {
      const currentYear = new Date().getFullYear()
      document.querySelectorAll('.footer-year').forEach((el) => {
        el.textContent = currentYear
      })
    },

    setupNavSearch: function () {
      const navSearch = document.querySelector('.nav-search input')
      if (navSearch) {
        navSearch.addEventListener('focus', function () {
          this.parentElement.classList.add('active')
        })
        navSearch.addEventListener('blur', function () {
          this.parentElement.classList.remove('active')
        })
      }
    },

    setupQuickLinks: function () {
      document.querySelectorAll('.quick-link').forEach((link) => {
        link.addEventListener('click', function (e) {
          e.preventDefault()
          const target = this.getAttribute('href')
          if (target && target.startsWith('#')) {
            const el = document.querySelector(target)
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' })
            }
          }
        })
      })
    },

    setupBreadcrumbs: function () {
      const breadcrumb = document.querySelector('.breadcrumb')
      if (breadcrumb) {
        const path = window.location.pathname
          .split('/')
          .filter((p) => p && !p.includes('.html'))
        let html = '<span>Home</span>'
        path.forEach((p, i) => {
          html += '<span class="separator">/</span>'
          html += `<span>${p.charAt(0).toUpperCase() + p.slice(1)}</span>`
        })
        breadcrumb.innerHTML = html
      }
    },

    setupLastUpdated: function () {
      const updated = document.querySelector('.last-updated')
      if (updated) {
        const date = new Date(document.lastModified)
        updated.textContent = `Last updated: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
      }
    },

    setupTableSearch: function () {
      document.querySelectorAll('.table-search').forEach((input) => {
        input.addEventListener('input', function () {
          const table = this.closest('table')
          if (!table) return
          const filter = this.value.toLowerCase()
          const rows = table.querySelectorAll('tbody tr')
          rows.forEach((row) => {
            const text = row.textContent.toLowerCase()
            row.style.display = text.includes(filter) ? '' : 'none'
          })
        })
      })
    },

    setupAccordionToggle: function () {
      document.querySelectorAll('.accordion-toggle').forEach((toggle) => {
        toggle.addEventListener('click', function () {
          const target = this.dataset.target
          if (target) {
            const content = document.querySelector(target)
            if (content) {
              content.classList.toggle('open')
              this.classList.toggle('active')
            }
          }
        })
      })
    },

    setupTabSystem: function () {
      document.querySelectorAll('.tab-system').forEach((system) => {
        const tabs = system.querySelectorAll('.tab-btn')
        const panels = system.querySelectorAll('.tab-panel')
        tabs.forEach((tab) => {
          tab.addEventListener('click', function () {
            tabs.forEach((t) => t.classList.remove('active'))
            this.classList.add('active')
            const target = this.dataset.target
            panels.forEach((panel) => {
              panel.classList.remove('active')
              if (panel.id === target) {
                panel.classList.add('active')
              }
            })
          })
        })
      })
    },

    setupScrollTop: function () {
      const btn = document.getElementById('scrollTopBtn')
      if (btn) {
        btn.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
      }
    },

    setupSidebarToggle: function () {
      const toggle = document.getElementById('sidebarToggle')
      const sidebar = document.querySelector('.sidebar')
      if (toggle && sidebar) {
        toggle.addEventListener('click', function () {
          sidebar.classList.toggle('open')
          this.classList.toggle('active')
        })
      }
    },

    setupMobileNavToggle: function () {
      const toggle = document.getElementById('mobileNavToggle')
      const nav = document.querySelector('.nav-links')
      if (toggle && nav) {
        toggle.addEventListener('click', function () {
          nav.classList.toggle('open')
          this.classList.toggle('active')
        })
      }
    },

    setupSearchShortcut: function () {
      document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault()
          const search = document.getElementById('searchInput')
          if (search) {
            search.focus()
          }
        }
      })
    },

    setupThemePreference: function () {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
      const savedTheme = localStorage.getItem('glander-theme')

      if (savedTheme) {
        document.body.className = savedTheme
      } else if (prefersDark.matches) {
        document.body.className = 'dark'
      }

      prefersDark.addEventListener('change', function (e) {
        if (!localStorage.getItem('glander-theme')) {
          document.body.className = e.matches ? 'dark' : 'light'
        }
      })
    },

    log: function (message, type = 'info') {
      const prefix = `[GlanderIO v${GlanderIO.version}]`
      switch (type) {
        case 'info':
          console.log(`${prefix} ${message}`)
          break
        case 'warn':
          console.warn(`${prefix} ${message}`)
          break
        case 'error':
          console.error(`${prefix} ${message}`)
          break
        default:
          console.log(`${prefix} ${message}`)
      }
    },

    getVersion: function () {
      return GlanderIO.version
    },

    getBuild: function () {
      return GlanderIO.build
    },

    getAuthor: function () {
      return GlanderIO.author
    },

    getCompany: function () {
      return GlanderIO.company
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      UI.init()
      UI.log('Documentation loaded successfully')
    })
  } else {
    UI.init()
    UI.log('Documentation loaded successfully')
  }

  window.GlanderIO = GlanderIO
  window.UI = UI
})()
