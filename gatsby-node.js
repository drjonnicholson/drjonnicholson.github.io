exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    SiteSiteMetadata: {
      headerFile: {
        type: 'File',
        resolve: (source, args, context) => {
          return context.nodeModel.findOne({
            query: {
              filter: {
                relativePath: {
                  eq: source.header
                }
              }
            },
            type: 'File'
          })
        }
      }
    },
    SiteSiteMetadataAuthor: {
      imageFile: {
        type: 'File',
        resolve: (source, args, context) => {
          return context.nodeModel.findOne({
            query: {
              filter: {
                relativePath: {
                  eq: source.image
                }
              }
            },
            type: 'File',
          })
        }
      }
    }
  })
}