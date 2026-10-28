/*=============== SITE INTERACTIONS ===============*/
(() => {
  const header = document.getElementById('site-header')
  const navToggle = document.getElementById('nav-toggle')
  const siteNav = document.getElementById('site-nav')
  const themeToggle = document.getElementById('theme-toggle')
  const mobileQuery = window.matchMedia('(max-width: 799px)')

  /* Storage can throw in private windows or with blocked site data */
  const readTheme = () => {
    try {
      return localStorage.getItem('theme')
    } catch (error) {
      return null
    }
  }

  const saveTheme = (theme) => {
    try {
      localStorage.setItem('theme', theme)
    } catch (error) {
      /* The choice still applies for this visit */
    }
  }

  /*=============== HEADER SHADOW ===============*/
  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8)
  }

  updateHeader()
  window.addEventListener('scroll', updateHeader, { passive: true })

  /*=============== MOBILE MENU ===============*/
  const setMenuOpen = (open) => {
    siteNav.hidden = !open
    navToggle.setAttribute('aria-expanded', String(open))
    navToggle.querySelector('i').className = open ? 'ri-close-line' : 'ri-menu-line'
  }

  navToggle.addEventListener('click', () => {
    setMenuOpen(siteNav.hidden)
  })

  /* Escape closes the menu and returns focus to the toggle */
  siteNav.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !siteNav.hidden) {
      setMenuOpen(false)
      navToggle.focus()
    }
  })

  /* Choosing a link on mobile closes the menu */
  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobileQuery.matches) {
      setMenuOpen(false)
    }
  })

  /* Desktop always shows the links; keep the toggle state consistent */
  const syncMenuToViewport = () => {
    if (!mobileQuery.matches) {
      siteNav.hidden = false
    } else {
      setMenuOpen(false)
    }
  }

  mobileQuery.addEventListener('change', syncMenuToViewport)
  syncMenuToViewport()

  /*=============== THEME ===============*/
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme
    const isDark = theme === 'dark'
    themeToggle.setAttribute('aria-pressed', String(isDark))
    themeToggle.querySelector('i').className = isDark ? 'ri-sun-line' : 'ri-moon-line'
  }

  const storedTheme = readTheme()
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(storedTheme || (systemDark ? 'dark' : 'light'))

  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    saveTheme(next)
  })
})()
