// import { asMonth, quoteTitle } from '../../../utils'
import Authors from './Authors'
import PropTypes from 'prop-types'

const Periodical = ({ entry }) => (
  <>
    <Authors>{entry.author}</Authors>,{' '}
    {/* {quoteTitle(entry.title, [entry.journal, entry.volume, entry.number, entry.pages, entry.month, entry.year])}{' '} */}
    {/* {entry.journal && (
      <>
        <i>{entry.journal}</i>,{' '}
      </>
    )}
    {entry.volume && <>vol. {entry.volume}, </>}
    {entry.number && <>no. {entry.number}, </>}
    {entry.pages && <>pp. {entry.pages}, </>}*/}
    {/* {entry.month && asMonth(entry.month)} */}
    {/*{entry.year && <>{entry.year}</>}
    {(entry.journal || entry.volume || entry.number || entry.pages || entry.month || entry.year) && <>.</>} */}
  </>
)

Periodical.propTypes = {
  entry: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    journal: PropTypes.string,
    number: PropTypes.string,
    type: PropTypes.string.isRequired,
    volume: PropTypes.string,
    pages: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
}

export default Periodical
