import { useStaticQuery, graphql } from "gatsby"

const usePublicationsGrouped = () => {
  const data = useStaticQuery(
    graphql`
      query PublicationsGrouped {
        allReference(sort: {fields: [year, month], order: DESC}) {
          group(field: entry_type) {
            fieldValue
            totalCount
            edges {
              node {
                ...publication
              }
            }
          }
        }
      }
    `
  )

  return data.allReference.group
}

export default usePublicationsGrouped