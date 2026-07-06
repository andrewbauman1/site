if ('share' in navigator) {
  for (const shareButton of document.querySelectorAll('[data-share-url]')) {
    shareButton.hidden = false
    shareButton.addEventListener('click', event => {
      const url = shareButton.getAttribute('data-share-url')
      navigator.share({url})
    })
  }
}

// Background blob mouse parallax. Sets --blob-mx/--blob-my, which the
// `translate` property on body::before reads (see new.scss). Skipped
// entirely for reduced-motion users.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const blobStrength = 90 // max px offset in each direction
  const root = document.documentElement
  let ticking = false
  let mx = 0
  let my = 0

  window.addEventListener('mousemove', event => {
    mx = (event.clientX / window.innerWidth - 0.5) * 2 * blobStrength
    my = (event.clientY / window.innerHeight - 0.5) * 2 * blobStrength

    if (!ticking) {
      ticking = true
      requestAnimationFrame(() => {
        root.style.setProperty('--blob-mx', mx.toFixed(1) + 'px')
        root.style.setProperty('--blob-my', my.toFixed(1) + 'px')
        ticking = false
      })
    }
  }, {passive: true})
}
