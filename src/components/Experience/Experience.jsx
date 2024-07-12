import styles from './Experience.module.css'
import { experience } from 'site-config'

const Experience = () => {
  return (
    <div className={styles.experience}>
      <h3>{experience.title}</h3>
      <p>{experience.foreword}</p>
      {experience.content.map((text) => (
        <p key={text}>{text}</p>
      ))}
      <p>{experience.afterword}</p>
    </div>
  )
}

export default Experience
