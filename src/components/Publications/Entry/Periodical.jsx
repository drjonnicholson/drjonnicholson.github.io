import { asMonth, quoteTitle } from '../../../utils'
import Authors from './Authors'
import PropTypes from 'prop-types'

const Periodical = ({ entry }) => {
  const title = quoteTitle(entry.title, [
    entry.journal,
    entry.volume,
    entry.number,
    entry.pages,
    entry.month,
    entry.year,
  ])
  const journal = entry.journal ? <i>{entry.journal}, </i> : ''
  const volume = entry.volume ? `vol. ${entry.volume}, ` : ''
  const number = entry.number ? `no. ${entry.number}, ` : ''
  const pages = entry.pages ? `pp. ${entry.pages}, ` : ''
  const month = entry.month ? '' : '' //`${asMonth(entry.month)} ` : ''
  const year = entry.year ? entry.year : ''
  const stop = entry.journal || entry.volume || entry.number || entry.pages || entry.month || entry.year ? '.' : ''
  return (
    <>
      <Authors>{entry.author}</Authors>, {title} {journal}
      {volume}
      {number}
      {pages}
      {month}
      {year}
      {stop}
    </>
  )
}

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
