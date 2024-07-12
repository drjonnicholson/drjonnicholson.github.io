import publications from '../../publications.json'
import PublicationGroup from './PublicationGroup'
import styles from './Publications.module.css'
import { publications as config } from 'site-config'

const Publications = () => {
  return (
    <div className={styles.publications}>
      <h2>{config.title}</h2>
      <p>{config.foreword}</p>
      {publications.map(({ title, content }) => (
        <PublicationGroup key={title} title={title} content={content} />
      ))}
      <p className={styles.small}>{config.afterword}</p>
    </div>
  )
}

export default Publications
