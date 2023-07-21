import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            url
            prefix
            title
            subtitle
            headline
            description
            keywords
            header
            headerFile {
              childImageSharp {
                gatsbyImageData(
                  width: 800
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                  quality: 100
                )
              }
            }
            publications {
              highlight
            }
            social {
                twitter
                github
                linkedin
            }
            author {
              name
              about
              image
              imageFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 300
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    quality: 100
                  )
                }
              }
              url
              skills {
                text
                icon
              }
              experience
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}

export default useSiteMetadata