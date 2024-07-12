import { asMonth, quoteTitle } from '../../../utils'
import Authors from './Authors'
import PropTypes from 'prop-types'

const InProceedings = ({ entry }) => (
  <>
    <Authors>{entry.author}</Authors>, {quoteTitle(entry.title, [entry.booktitle, entry.address])}{' '}
    {entry.booktitle && (
      <>
        in <i>{entry.booktitle}</i>
      </>
    )}
    {entry.address && <>, {entry.address}</>}
    {(entry.booktitle || entry.address) && <>,</>}
    {entry.month && <> {asMonth(entry.month)}</>}
    {entry.year && <> {entry.year}</>}
    {entry.pages && <>, pages {entry.pages}</>}.
  </>
)

InProceedings.propTypes = {
  entry: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    booktitle: PropTypes.string,
    address: PropTypes.string,
    type: PropTypes.string.isRequired,
    pages: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
}

export default InProceedings
