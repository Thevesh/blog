/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'thevesh.com',
  author: 'Thevesh Theva',
  headerTitle: 'thevesh.com',
  description: 'Writing makes me think properly. Writing publicly makes me disciplined and accountable. On this personal site, I discuss data, first principles, and policy ideas. I hope to experience all the joys of writing along the way.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://thevesh.com',
  siteRepo: 'https://github.com/Thevesh/blog',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/og-image.jpg',
  email: 'thevesh.theva@gmail.com',
  github: 'https://github.com/Thevesh',
  twitter: 'https://twitter.com/Thevesh',
  linkedin: 'https://www.linkedin.com/in/Thevesh',
  locale: 'en-US',
  analytics: {},
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    }
  },
}

module.exports = siteMetadata
