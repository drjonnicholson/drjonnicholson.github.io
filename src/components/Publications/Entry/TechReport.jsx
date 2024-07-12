import { asMonth, quoteTitle } from '../../../utils'
import Authors from './Authors'
import PropTypes from 'prop-types'

const TechReport = ({ entry }) => (
  <>
    <Authors>{entry.author}</Authors>, {quoteTitle(entry.title)}
    {entry.institution && <>{entry.institution}</>}
    {entry.address && <>, {entry.address}</>}
    {(entry.type || entry.number) && <>, </>}
    {entry.type && <>{entry.type} </>}
    {entry.number && <>{entry.number}</>}
    {(entry.type || entry.number) && <>, </>}
    {entry.month && <>{asMonth(entry.month)} </>}
    {entry.year && <>{entry.year}</>}.
  </>
)

TechReport.propTypes = {
  entry: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    institution: PropTypes.string,
    address: PropTypes.string,
    type: PropTypes.string.isRequired,
    number: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
}

export default TechReport
