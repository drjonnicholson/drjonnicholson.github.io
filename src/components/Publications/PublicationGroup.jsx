// import Publication from './Publication'
import PropTypes from 'prop-types'

const PublicationGroup = ({ title, content }) => {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {/* {content.map((entry) => (
          <Publication key={entry.id} entry={entry} />
        ))} */}
      </ul>
    </div>
  )
}

PublicationGroup.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      raw: PropTypes.string.isRequired,
      address: PropTypes.string,
      school: PropTypes.string,
      month: PropTypes.string,
      year: PropTypes.string,
      pdf: PropTypes.string,
      doi: PropTypes.string,
      url: PropTypes.string,
      note: PropTypes.string,
      abstract: PropTypes.string,
      edition: PropTypes.string,
      editor: PropTypes.string,
      publisher: PropTypes.string,
      series: PropTypes.string,
      volume: PropTypes.string,
      pages: PropTypes.string,
      journal: PropTypes.string,
      number: PropTypes.string,
      institution: PropTypes.string,
    }),
  ).isRequired,
}

export default PublicationGroup
