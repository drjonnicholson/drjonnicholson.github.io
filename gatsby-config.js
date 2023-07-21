/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require('path')
const siteMetadata = require('./siteMetadata')



module.exports = {
  siteMetadata: siteMetadata,
  flags: { 
    FAST_DEV: true
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'publications',
        path: path.join(__dirname, 'src', 'publications'),
      },
    },
    {
      resolve: require.resolve('./plugins/gatsby-source-credly'),
      options: {
        users: ['drjonnicholson'],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
        sassOptions: {
          precision: 6,
        },
      },
    },
    // {
    //   resolve: 'gatsby-plugin-postcss',
    //   options: {
    //     postCssPlugins: [
    //       require('postcss-easy-import')(),
    //       require('postcss-custom-properties')({ preserve: false }),
    //       require('postcss-color-function')(),
    //       require('autoprefixer')(),
    //     ],
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-purgecss',
    //   options: {
    //     printRejected: true, // Print removed selectors and processed file names
    //     develop: true, // Enable while using 'gatsby develop'
    //     // tailwind: true, // Enable tailwindcss support
    //     // whitelist: ['whitelist'], // Don't remove this selector
    //     ignore: ['bootstrap/'], // Ignore files/folders
    //     purgeOnly : ['components/', '/main.css'], // Purge only these files/folders
    //   },
    // },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-bibtex',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.titleShort,
        start_url: siteMetadata.prefix,
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
  ],
}
