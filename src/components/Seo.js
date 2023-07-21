import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import useSiteMetadata from '../hooks/useSiteMetadata'

const Seo = ({ title, description, lang, image, article }) => {
  const { href } = useLocation()

  const {
    title: defaultTitle,
    subtitle,
    description: defaultDescription,
    image: defaultImage,
    keywords,
    social: {
      twitter
    },
    author: {
      name: authorName
    },
  } = useSiteMetadata()

  const metaTitle = title || defaultTitle
  const metaDescription = description || defaultDescription
  const metaImage = image || defaultImage

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={metaTitle}
      titleTemplate={`%s | ${subtitle}`}
      meta={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        },
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'image',
          content: metaImage,
        },
        {
          name: 'keywords',
          content: (keywords ? keywords.join(', ') : []),
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: (article ? 'article' : 'website'),
        },
        {
          property: 'og:url',
          content: href,
        },
        {
          name: 'twitter:card',
          content: 'summary',//summary_large_image
        },
        {
          name: 'twitter:creator',
          content: (twitter ? (twitter.startsWith('@') ? twitter : `@${twitter}`) : authorName),
        },
        {
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: metaImage,
        },
      ]}
    />
  )
}

export default Seo

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

Seo.defaultProps = {
  title: null,
  description: null,
  image: null,
  lang: 'en',
  article: false,
}
