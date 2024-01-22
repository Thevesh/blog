/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'thevesh.com',
  author: 'Thevesh Theva',
  headerTitle: 'thevesh.com',
  description: 'Writing is the best way to think. Writing publicly makes me do it with discipline and accountability. Welcome to a place where I discuss data, principles I apply to situations where data is useless, and policy ideas (typically based on data, but still half-baked). I hope to experience and hold on to the joy of writing along the way.',
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
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    }
  },
}

module.exports = siteMetadata
