import PropTypes from 'prop-types'
import { useMemo } from 'react'
import Icon from './Icon'

const getDetail = (type, username) => {
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

const SocialLink = ({ type, username }) => {
  const { title, href } = useMemo(() => getDetail(type, username), [type, username])

  return (
    <li>
      <a href={href} rel="noopener noreferrer" title={title}>
        {<Icon name={type} size="2em" color="black" title={title} />}
      </a>
    </li>
  )
}

SocialLink.propTypes = {
  type: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default SocialLink
