import Publication from './Publication'
import styled from './PublicationGroup.module.css'

const PublicationGroup = ({ title, content }) => {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {content.map((entry) => (
          <Publication key={entry.id} entry={entry} />
        ))}
      </ul>
    </div>
  )
}

export default PublicationGroup
