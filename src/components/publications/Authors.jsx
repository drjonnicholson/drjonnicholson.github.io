import Highlighter from 'react-highlight-words'
import { publications as config } from 'site-config'

const Authors = ({ children }) => (
  <Highlighter searchWords={config.highlight} textToHighlight={children} highlightTag="strong" />
)

export default Authors
