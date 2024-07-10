import { socials } from 'site-config'
import SocialLink from './SocialLink'
import styles from './Socials.module.css'

const Socials = () => {
  return (
    <div className={styles.socials}>
      <ul>
        {Object.entries(socials).map(([type, username]) => (
          <SocialLink key={type} type={type} username={username} />
        ))}
      </ul>
    </div>
  )
}

export default Socials
