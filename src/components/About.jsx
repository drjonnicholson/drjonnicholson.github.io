import { author, about } from 'site-config'
import avatar from '../images/avatar.png'
import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.blurb}>
      <picture>
        <img src={avatar} alt={author} />
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
