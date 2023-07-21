import React from "react"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Social from "./Social"
import useSiteMetadata from '../hooks/useSiteMetadata'

const Footer = () => {
  const {subtitle, author} = useSiteMetadata()

  return (
    <Row as="footer" className="bg-secondary py-5 text-dark">
      <Container>
        <Row>
          <Col className="text-center">
            <Social />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            {subtitle} &copy; {new Date().getFullYear()}&nbsp;<a href={author.url}>{author.name}</a>
          </Col>
        </Row>
      </Container>
    </Row>
  )
}

export default Footer
