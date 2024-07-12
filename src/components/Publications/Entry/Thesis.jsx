import { quoteTitle } from '../../../utils'
import Authors from './Authors'
import PropTypes from 'prop-types'

const Thesis = ({ entry }) => (
  <>
    <Authors>{entry.author}</Authors>, {quoteTitle(entry.title)}
    {entry.type && <>{entry.type} </>}
    {entry.type === 'phdthesis' && <>PhD Thesis</>}
    {entry.type === 'mastersthesis' && <>Masters Thesis</>}
    {entry.school && <>, {entry.school}</>}
    {entry.address && <>, {entry.address}</>}
    {entry.year && <>, {entry.year}</>}.
  </>
)

Thesis.propTypes = {
  entry: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string,
    type: PropTypes.string.isRequired,
    school: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
}

export default Thesis
