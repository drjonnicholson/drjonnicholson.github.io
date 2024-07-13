import { quoteTitle } from '../../../utils'
import Authors from './Authors'
import PropTypes from 'prop-types'

const Book = ({ entry }) => (
  <>
    <Authors>{entry.author}</Authors>, {quoteTitle(entry.title)} {entry.edition && <>{entry.edition} ed., </>}
    {entry.editor && <>{entry.editor}, </>}
    {entry.address && <>{entry.address}: </>}
    {entry.publisher && <>{entry.publisher}, </>}
    {entry.year && entry.year}.
  </>
)

Book.propTypes = {
  entry: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    edition: PropTypes.string,
    address: PropTypes.string,
    type: PropTypes.string.isRequired,
    editor: PropTypes.string,
    publisher: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
}

export default Book
