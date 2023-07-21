import { getImage } from 'gatsby-plugin-image'
import { convertToBgImage } from 'gbimage-bridge'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import useSiteMetadata from '../hooks/useSiteMetadata'


const Splash = () => {
  const {title, headline, headerFile: { childImageSharp: { gatsbyImageData }}} = useSiteMetadata()
  const image = getImage(gatsbyImageData)
  const bgImage = convertToBgImage(image)

  return (
    <Row className='bg-primary align-items-center text-light'>
      <Col className='px-0'>
        <BackgroundImage
          Tag='div'
          {...bgImage}
          // style={{filter: 'blur(4px)'}}
        >
          <Container fluid className='p-5 splash'>
            <div className='title'>
              <div className='display-3'>{title}</div>
              <p className='lead'>{headline}</p>
            </div>
          </Container>
        </BackgroundImage>
      </Col>
      

  {/* <div class='col-12 p-0 bg-primary vh-50 py-5'>
              <div class='container'>
                  <div class='row'>
                      <div class='col-xl-6 col-lg-7 py-2 text-light'>
                          <h1 class='display-3 mb-0'>
                              <span>Greyson</span>
                          </h1>
                          <p class='lead mb-3 w-75'>
                              <span>Square corners with shades of gray and sea green.</span> This font face is Oswald. <a class='font-weight-bold text-white' href='http://themestr.app'>Themestr.app</a> makes 
                              it easy to customize this, and other free Bootstrap 4 themes for your downloading pleasure.
                          </p>
                          <a class='btn btn-outline-light btn-lg mr-2' href='http://themestr.app' target='_new'>Customize</a> 
                                                          <div class='btn-group'>
                                    <a href='theme.css' class='btn btn-outline-light btn-lg'>
                                      Download Theme
                                    </a>
                                    <button type='button' class='btn btn-lg btn-outline-light dropdown-toggle dropdown-toggle-split' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                      <span class='sr-only'>Downloads</span>
                                    </button>
                                    <div class='dropdown-menu'>
                                        <a class='dropdown-item' href='theme.css'>theme.css</a>
                                        <a class='dropdown-item' href='theme.min.css'>theme.min.css</a>
                                        <div class='dropdown-divider'></div>
                                        <a class='dropdown-item' href='theme.scss'>theme.scss</a>
                                        <div class='dropdown-divider'></div>
                                        <a class='dropdown-item' target='new' href='https://github.com/ThemesGuide/bootstrap-themes/tree/master/greyson'>Full template</a>
                                    </div>
                                  </div> 
                      </div>
                      <div class='col-xl-6 col'>
                        <div class='text-lg-right' title='Theme colors'>
                            <h3>
                                <span class='badge badge-pill bg-secondary' title='secondary'>&nbsp;</span>
                                <span class='badge badge-pill bg-success' title='success'>&nbsp;</span>
                                <span class='badge badge-pill bg-danger' title='danger'>&nbsp;</span>
                                <span class='badge badge-pill bg-info' title='info'>&nbsp;</span>
                                <span class='badge badge-pill bg-warning' title='warning'>&nbsp;</span>
                                <span class='badge badge-pill bg-light' title='light'>&nbsp;</span>
                                <span class='badge badge-pill bg-dark' title='dark'>&nbsp;</span>
                            </h3>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
 */}
    </Row>
  )
}

export default Splash
