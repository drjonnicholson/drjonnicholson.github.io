import styles from './Footer.module.css'
import { author, homepage, name } from 'site-config'

const Footer = () => (
  <div className={styles.footer}>
    <a href={homepage}>{name}</a>&nbsp;&copy; {new Date().getFullYear()} {author}
  </div>
)

export default Footer
