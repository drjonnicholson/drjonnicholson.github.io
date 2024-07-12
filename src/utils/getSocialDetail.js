const getSocialDetail = (type, username) => {
  switch (type) {
    case 'researchgate':
      return {
        title: 'ResearchGate',
        href: `https://www.researchgate.net/profile/${username}`,
      }
    case 'twitter':
      return {
        title: 'X (the social platform formally knwon as Twitter)',
        href: `https://twitter.com/${username}`,
      }
    case 'linkedin':
      return {
        title: 'LinkedIn',
        href: `https://www.linkedin.com/in/${username}`,
      }
    case 'github':
      return {
        title: 'GitHub',
        href: `https://github.com/${username}`,
      }
    default:
      return {
        title: 'Unknown',
        href: `/`,
      }
  }
}

export default getSocialDetail
