/** Devangwa programme focus matchers for catalogue filters */

export const CURATED_FOCUS = [
  {
    value: 'communication',
    label: 'Communication',
    match: (c) => matchesCourseText(c, ['communication', 'mawasiliano']),
  },
  {
    value: 'conflict',
    label: 'Conflict & teamwork',
    match: (c) => matchesCourseText(c, ['conflict', 'tension', 'teamwork', 'migogoro']),
  },
  {
    value: 'marriage',
    label: 'Marriage & couples',
    match: (c) => matchesCourseText(c, ['marriage', 'couples', 'couple', 'ndoa', 'wanandoa']),
  },
  {
    value: 'connection',
    label: 'Connection & trust',
    match: (c) => matchesCourseText(c, ['connection', 'trust', 'intimacy', 'imani']),
  },
]

export function matchesCourseText(course, keywords) {
  const haystack = [
    course.title,
    course.description,
    ...(course.tags || []),
    course.category,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return keywords.some((kw) => haystack.includes(kw))
}

export function courseMatchesFocus(course, focusValue) {
  if (!focusValue) return true
  if (focusValue === 'featured') return Boolean(course.is_featured)
  const curated = CURATED_FOCUS.find((f) => f.value === focusValue)
  if (curated) return curated.match(course)
  return matchesCourseText(course, [focusValue.replace(/-/g, ' ')])
}

export function buildFocusOptions(courses = []) {
  const list = courses
  const options = [{ value: '', label: 'All programmes', count: list.length }]

  const featuredCount = list.filter((c) => c.is_featured).length
  if (featuredCount > 0) {
    options.push({ value: 'featured', label: 'Featured programmes', count: featuredCount })
  }

  for (const curated of CURATED_FOCUS) {
    const count = list.filter((c) => curated.match(c)).length
    if (count > 0) {
      options.push({ value: curated.value, label: curated.label, count })
    }
  }

  const seen = new Set(options.map((o) => o.value))
  for (const course of list) {
    for (const tag of course.tags || []) {
      const raw = typeof tag === 'string' ? tag : tag.tag || tag.name || ''
      const value = raw.trim().toLowerCase().replace(/\s+/g, '-')
      if (!value || seen.has(value)) continue
      const count = list.filter((c) =>
        (c.tags || []).some((t) => {
          const s = (typeof t === 'string' ? t : t.tag || t.name || '').toLowerCase()
          return s === raw.toLowerCase() || s.replace(/\s+/g, '-') === value
        })
      ).length
      if (count > 0) {
        seen.add(value)
        options.push({ value, label: raw, count })
      }
    }
  }

  return options
}
