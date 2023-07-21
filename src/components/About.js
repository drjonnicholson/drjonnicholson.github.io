import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Cloud, renderSimpleIcon } from 'react-icon-cloud'
import icons from 'simple-icons'
import useSiteMetadata from '../hooks/useSiteMetadata'

const About = () => {
  const {author: {name, about, skills, experience, imageFile: { childImageSharp: { gatsbyImageData }}}} = useSiteMetadata()

  const cloudOpts = {
    containerProps: {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }
    },
    options: {
      clickToFront: 500,
      depth: 1,
      imageScale: 2,
      initial: [0.1, -0.1],
      outlineColour: '#0000',
      reverse: true,
      tooltip: 'native',
      tooltipDelay: 0,
      wheelZoom: false
    }
  };

  const skillCloud = skills.map(({text, icon}) => {
    return renderSimpleIcon({
      icon: icons.Get(icon),
      minContrastRatio: 1.2,
      // bgHex: '#ffffff',
      size: 42,
      // fallbackHex: '#ffffff',
      aProps: {
        href: undefined,
        target: undefined,
        rel: undefined,
        onClick: (e) => e.preventDefault()
      }
    })
  })

  return (
    <>
      <Row id='about' className='py-5'>
        <Col md='auto'>
          <GatsbyImage image={getImage(gatsbyImageData)} alt={name} />
        </Col>
        <Col md={true}>
          <p>{about}</p>
        </Col>
      </Row>
      {skills &&
        <Row>
          <Col>
            <h2>Skills</h2>
            <Cloud {...cloudOpts}>
              {skillCloud}
            </Cloud>
            And more…
            <p>Did I not mention a skill you’re looking for? I’m happy to learn!</p>
          </Col>
        </Row>
      }
      {experience &&
        <Row>
          <Col>
            <h2>Experience</h2>
            {skills.map((text, idx) => <p key={idx}>{text}</p>)}
          </Col>
        </Row>
      }
    </>
  )
}

export default About