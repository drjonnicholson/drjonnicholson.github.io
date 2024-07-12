import PropTypes from 'prop-types'
import { asMonth, quoteTitle } from '../../../utils'
import Authors from './Authors'

const Proceedings = ({ entry }) => (
  <>
    <Authors>{entry.author}</Authors>, {quoteTitle(entry.title)} {entry.address && <>{entry.address}: </>}
    {entry.publisher && <>{entry.publisher}, </>}
    {entry.month && <>{asMonth(entry.month)} </>}
    {entry.year && <>{entry.year}</>}.
  </>
)

Proceedings.propTypes = {
  entry: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    publisher: PropTypes.string,
    address: PropTypes.string,
    type: PropTypes.string.isRequired,
    month: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
}

export default Proceedings
