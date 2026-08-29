class ModuleSearch {
  constructor() {
    this.index = []
    this.cards = []
    this.sections = []
    this.buildIndex()
    this.setupUI()
  }

  buildIndex() {
    this.cards = document.querySelectorAll('.module-card')
    this.sections = document.querySelectorAll('.module-section')

    this.cards.forEach((card) => {
      const name = card.querySelector('.name')?.textContent?.trim() || ''
      const path = card.querySelector('.path')?.textContent?.trim() || ''
      const desc = card.querySelector('.desc-full')?.textContent?.trim() || ''
      const section = card.closest('.module-section')
      const sectionName =
        section?.querySelector('h2')?.textContent?.trim() || ''

      this.index.push({
        element: card,
        section: section,
        sectionName: sectionName,
        name: name,
        path: path,
        desc: desc,
        score: 0
      })
    })
  }

  setupUI() {
    const searchBox = document.querySelector('.search-input')
    if (!searchBox) return

    const originalHandler = searchBox._listener || searchBox.oninput
    searchBox.addEventListener('input', (e) => {
      this.search(e.target.value)
    })

    this.addSearchStats()
  }

  search(query) {
    const q = query.toLowerCase().trim()

    if (!q) {
      this.cards.forEach((c) => (c.style.display = ''))
      this.sections.forEach((s) => (s.style.display = ''))
      this.updateStats(this.cards.length)
      return
    }

    const words = q.split(/\s+/)
    let visibleCount = 0

    this.index.forEach((item) => {
      let score = 0
      const text = (
        item.name +
        ' ' +
        item.path +
        ' ' +
        item.desc +
        ' ' +
        item.sectionName
      ).toLowerCase()

      words.forEach((word) => {
        if (text.includes(word)) {
          score++
          if (item.name.toLowerCase().includes(word)) score += 2
          if (item.path.toLowerCase().includes(word)) score += 1.5
          if (item.desc.toLowerCase().includes(word)) score += 0.5
        }
      })

      item.score = score
    })

    this.index.sort((a, b) => b.score - a.score)

    const visibleSections = new Set()
    this.index.forEach((item) => {
      if (item.score > 0) {
        item.element.style.display = ''
        visibleSections.add(item.section)
        visibleCount++
      } else {
        item.element.style.display = 'none'
      }
    })

    this.sections.forEach((section) => {
      const hasVisible = this.index.some(
        (item) => item.section === section && item.score > 0
      )
      section.style.display = hasVisible ? '' : 'none'
    })

    this.updateStats(visibleCount)

    if (visibleCount === 1) {
      const visible = this.index.find((item) => item.score > 0)
      if (visible) {
        visible.element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        visible.element.classList.add('highlight')
        setTimeout(() => {
          visible.element.classList.remove('highlight')
        }, 1000)
      }
    }
  }

  updateStats(count) {
    let stats = document.querySelector('.module-stats')
    if (!stats) {
      const desc = document.querySelector('.module-section .desc')
      if (desc) {
        stats = document.createElement('div')
        stats.className = 'module-stats'
        stats.style.cssText = `
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding: 0.8rem 0;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: #4b5a72;
          border-bottom: 1px solid #eef3f9;
        `
        desc.parentNode.insertBefore(stats, desc)
      }
    }

    if (stats) {
      const total = this.cards.length
      stats.innerHTML = `
        <span>📦 Modules: <strong>${count}</strong> / ${total}</span>
        <span>📄 Sections: <strong>${document.querySelectorAll('.module-section').length}</strong></span>
        ${count < total ? `<span>🔍 Found ${count} matching modules</span>` : ''}
      `
    }
  }

  addSearchStats() {
    this.updateStats(this.cards.length)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  window.moduleSearch = new ModuleSearch()
})
