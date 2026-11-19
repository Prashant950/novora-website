import { useEffect } from 'react'

export default function SEO({
  title = 'NOVORA | Turnkey Retail Fit-Outs, Store Fixtures & Signage',
  description = "NOVORA is India's leading single-point retail execution partner. Turnkey retail fit-outs, precision fixtures, facade signage, and visual merchandising manufactured in-house across 120,000 sq.ft and delivered to 40+ cities.",
  keywords = 'retail fit-outs India, turnkey store build, retail fixtures manufacturer, retail interior design, storefront signage, VM props, commercial interior execution, CNC retail millwork, store rollout nationwide',
  canonical = 'https://novoraretail.in/',
  schema = null,
}) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title
    }

    // 2. Helper to set or update meta tag
    const setMeta = (name, content, attr = 'name') => {
      if (!content) return
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // 3. Helper to set or update link tag
    const setLink = (rel, href) => {
      if (!href) return
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    // 4. Update Meta Tags
    setMeta('description', description)
    setMeta('keywords', keywords)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)

    // 5. Canonical Link
    setLink('canonical', canonical)

    // 6. Dynamic JSON-LD Structured Schema Script
    let scriptTag = document.getElementById('page-jsonld-schema')
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = 'page-jsonld-schema'
        scriptTag.type = 'application/ld+json'
        document.head.appendChild(scriptTag)
      }
      scriptTag.text = JSON.stringify(schema)
    } else if (scriptTag) {
      scriptTag.remove()
    }
  }, [title, description, keywords, canonical, schema])

  return null
}
