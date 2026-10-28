/*=============== CONTACT FORM (EmailJS) ===============*/
(() => {
  const form = document.getElementById('contact-form')
  if (!form) return

  const status = document.getElementById('contact-status')
  const submitButton = form.querySelector('button[type="submit"]')
  const fallbackMessage = 'Sorry, the message could not be sent. Please email me directly at michaeloluwatoba14@gmail.com.'

  const setStatus = (message, state) => {
    status.textContent = message
    status.dataset.state = state
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    /* The EmailJS script is loaded from a CDN; fall back to a plain email link if it is blocked */
    if (typeof emailjs === 'undefined') {
      setStatus(fallbackMessage, 'error')
      return
    }

    /* Service ID, template ID, and public key identify this account; the public key is safe to expose */
    submitButton.disabled = true
    setStatus('Sending…', 'idle')

    emailjs.sendForm('service_3853g2u', 'template_s833dps', form, 'CvA6c6t7SOETGtE8W')
      .then(() => {
        form.reset()
        setStatus('Thanks, your message has been sent. I will reply as soon as I can.', 'success')
      })
      .catch(() => {
        setStatus(fallbackMessage, 'error')
      })
      .finally(() => {
        submitButton.disabled = false
      })
  })
})()
