import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Prism from 'prismjs'
import Banner from './Banner'
import Footer from './Footer'
import Seo from './Seo'
import '../styles/index.scss'
import 'prismjs-bibtex'

const Layout = ({ children }) => {
  useEffect(() => {
    Prism.highlightAll(false)
  })

  return (
    <Container fluid className='line-numbers'>  
      <Seo />
      <Banner />
      <main>
        {children}
      </main>
      <Footer />
    </Container>
  )
}

export default Layout