import Proceedings from './Proceedings'
import Book from './Book'
import InCollection from './InCollection'
import Periodical from './Periodical'
import Conference from './Conference'
import InProceedings from './InProceedings'
import Thesis from './Thesis'
import TechReport from './TechReport'
import PropTypes from 'prop-types'

const Entry = ({ entry }) => {
  switch (entry.type) {
    case 'proceedings':
      return <Proceedings entry={entry} />
    case 'unpublished':
      return <Proceedings entry={entry} />
    case 'misc':
      return <Proceedings entry={entry} />
    case 'book':
      return <Book entry={entry} />
    case 'inbook':
      return <InCollection entry={entry} />
    case 'incollection':
      return <InCollection entry={entry} />
    case 'article':
      return <Periodical entry={entry} />
    case 'conference':
      return <Conference entry={entry} />
    case 'inproceedings':
      return <InProceedings entry={entry} />
    case 'phdthesis':
      return <Thesis entry={entry} />
    case 'mastersthesis':
      return <Thesis entry={entry} />
    case 'techreport':
      return <TechReport entry={entry} />
  }
  return <Periodical entry={entry} />
}

Entry.propTypes = {
  entry: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
}

export default Entry
