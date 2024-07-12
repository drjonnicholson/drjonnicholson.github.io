import { quoteTitle } from '../../../utils'
import Authors from './Authors'
import PropTypes from 'prop-types'

const InCollection = ({ entry }) => (
  <>
    <Authors>{entry.author}</Authors>, {quoteTitle(entry.title, [entry.booktitle, entry.edition, entry.editor])}{' '}
    {entry.booktitle && (
      <>
        in <i>{entry.booktitle}</i>
      </>
    )}
    {entry.edition && <>, {entry.edition} ed.</>}
    {entry.editor && <>, {entry.editor}, </>}
    {(entry.booktitle || entry.edition || entry.editor) && <>, </>}
    {entry.year && <> {entry.year}</>}
    {entry.volume && <>, vol. {entry.volume}</>}
    {entry.pages && <>, pages {entry.pages}</>}.
  </>
)

InCollection.propTypes = {
  entry: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    booktitle: PropTypes.string.isRequired,
    edition: PropTypes.string,
    type: PropTypes.string.isRequired,
    editor: PropTypes.string,
    volume: PropTypes.string,
    pages: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
}

export default InCollection
