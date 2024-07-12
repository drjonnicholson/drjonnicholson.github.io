import { socials } from 'site-config'
import SocialLink from './SocialLink'
import styles from './Socials.module.css'
import { useMemo } from 'react'
import { getSocialDetail } from '../../utils'

const Socials = () => {
  const details = useMemo(() => {
    return Object.entries(socials).reduce((acc, [type, username]) => {
      acc.push({
        type,
        username,
        ...getSocialDetail(type, username),
      })
      return acc
    }, [])
  }, [])
  return (
    <div className={styles.socials}>
      <ul>
        {details.map(({ type, title, href }) => (
          <SocialLink key={type} type={type} title={title} href={href} />
        ))}
      </ul>
    </div>
  )
}

export default Socials
