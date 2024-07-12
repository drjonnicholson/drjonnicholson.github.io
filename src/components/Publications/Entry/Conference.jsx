import { asMonth } from '../../../utils'
import Authors from './Authors'
import PropTypes from 'prop-types'

const Conference = ({ entry }) => (
  <>
    <Authors>{entry.author}</Authors>, {entry.title}.{' '}
    {entry.booktitle && (
      <>
        <i>{entry.booktitle}</i>,{' '}
      </>
    )}
    {entry.series && <>{entry.series}, </>}
    {entry.volume && <>volume {entry.volume}, </>}
    {entry.pages && <>pages {entry.pages}. </>}
    {entry.address && <>{entry.address}. </>}
    {entry.publisher && <>{entry.publisher}, </>}
    {entry.month && <>{asMonth(entry.month)} </>}
    {entry.year && <>{entry.year}</>}.
  </>
)

Conference.propTypes = {
  entry: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    booktitle: PropTypes.string.isRequired,
    address: PropTypes.string,
    type: PropTypes.string.isRequired,
    series: PropTypes.string,
    volume: PropTypes.string,
    pages: PropTypes.string,
    publisher: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
}

export default Conference
