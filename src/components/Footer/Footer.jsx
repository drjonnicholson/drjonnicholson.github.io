import { name, author, homepage } from 'site-config'
import styles from './Footer.module.css'

const Footer = () => (
  <div className={styles.footer}>
    <a href={homepage}>{name}</a>&nbsp;&copy; {new Date().getFullYear()} {author}
  </div>
)

export default Footer
