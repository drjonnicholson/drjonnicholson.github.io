import { header } from 'site-config'
import styles from './Header.module.css'
import Socials from './Socials'

const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <div className={styles.title}>{header.title}</div>
          <div className={styles.headline}>{header.headline}</div>
        </div>
      </header>
      <Socials />
    </div>
  )
}

export default Header
