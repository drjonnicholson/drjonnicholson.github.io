import Highlighter from 'react-highlight-words'
import { publications as config } from 'site-config'
import PropTypes from 'prop-types'

const Authors = ({ children }) => (
  <Highlighter searchWords={config.highlight} textToHighlight={children} highlightTag="strong" />
)

Authors.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Authors
