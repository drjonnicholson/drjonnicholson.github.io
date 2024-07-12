import Icon from '../Icon/Icon'
import PropTypes from 'prop-types'

const SocialLink = ({ type, title, href }) => {
  return (
    <li>
      <a href={href} rel="noopener noreferrer" title={title}>
        {<Icon name={type} size="3em" color="black" title={title} />}
      </a>
    </li>
  )
}

SocialLink.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default SocialLink
