import { useStaticQuery, graphql } from "gatsby"

const usePublications = () => {
  const data = useStaticQuery(
    graphql`
      query Publications {
        allReference(sort: {fields: [year, month], order: DESC}) {
          edges {
            node {
              ...publication
            }
          }
        }
      }
    `
  )

  return data.allReference.edges
}

export default usePublications