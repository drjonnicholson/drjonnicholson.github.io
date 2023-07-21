import React from 'react'
import Container from 'react-bootstrap/Container'
import Splash from '../components/Splash'
import About from '../components/About'
import Publications from '../components/Publications'

const HomePage = () => (
  <>
    <Splash />
    <Container>
      <About/>
      <Publications />
    </Container>
  </>
)

export default HomePage
