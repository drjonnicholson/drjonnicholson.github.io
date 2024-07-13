import styles from './About.module.css'
import avatar01 from './images/01.png?width=230'
import { about, author } from 'site-config'

const About = () => {
  throw new Error('🌶️🌶️😉')
  return (
    <div className={styles.blurb}>
      <picture>
        <img src={avatar01} alt={author} />
      </picture>
      <div>
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

export default About
