import React from 'react'
import { Link } from 'gatsby'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Social from './Social'
import useSiteMetadata from '../hooks/useSiteMetadata'

const Banner = () => {
  const {title} = useSiteMetadata()

  return (
    <Navbar fixed='top' bg='dark' variant='dark' expand='lg' className='text-light'>
      <Container>
        <Navbar.Brand>
          <Link to='/' className='navbar-brand'>
            {title}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Social listClass='navbar-nav' itemClass='nav-item' linkClass='nav-link' />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Banner
