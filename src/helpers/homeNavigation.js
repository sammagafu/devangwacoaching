export function scrollToClientReviews() {
  const el = document.getElementById('client-reviews')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
