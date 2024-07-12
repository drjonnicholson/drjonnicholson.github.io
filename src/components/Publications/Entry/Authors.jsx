import PropTypes from 'prop-types'
// import Highlighter from 'react-highlight-words'
// import { publications as config } from 'site-config'

const Authors = ({ children }) => children
// <Highlighter searchWords={config.highlight} textToHighlight={children} highlightTag="strong" />

Authors.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Authors
