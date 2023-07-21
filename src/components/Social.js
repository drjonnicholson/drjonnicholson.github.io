import React from "react"
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"
import useSiteMetadata from '../hooks/useSiteMetadata'

const links = {
  twitter: {
    href: (name) => `https://twitter.com/${name}`,
    title: 'Twitter',
    icon: <FaTwitter />
  },
  linkedin: {
    href: (name) => `https://www.linkedin.com/in/${name}`,
    title: 'LinkedIn',
    icon: <FaLinkedin />
  },
  github: {
    href: (name) => `https://github.com/${name}`,
    title: 'GitHub',
    icon: <FaGithub />
  }
}

const Social = ({ listClass, itemClass, linkClass }) => {
  const { social } = useSiteMetadata()

  return (
    <ul className={listClass || 'list-inline'}>
      {social && Object.keys(social).map((key) => {
        const link = links[key]
        if (!link) {
          console.log(`Cannot find render for ${key}`)
          return null
        }
        return <SocialLink key={key} href={link.href(social[key])} title={link.title} className={itemClass} linkClass={linkClass}>{link.icon}</SocialLink>
      })}
    </ul>
  )
}

const SocialLink = ({ href, title, itemClass, linkClass, children }) => (
  <li className={itemClass || 'list-inline-item'}>
    <a href={href} className={linkClass || null} rel="noopener noreferrer" title={title}>
      {children}
    </a>
  </li>
)

export default Social
