/** Shared targets for the marketing homepage (demos/default). */
export const INTRO_VIDEO_URL = 'https://www.youtube.com/watch?v=tXHviS-4ygo'

export function scrollToClientReviews() {
  const el = document.getElementById('client-reviews')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
