import { FaLinkedin, FaRegCircleQuestion, FaSquareGithub, FaResearchgate } from 'react-icons/fa6'
import {
  DiCss3,
  DiDatabase,
  DiDotnet,
  DiGit,
  DiHtml5,
  DiJava,
  DiJsBadge,
  DiNodejsSmall,
  DiNpm,
  DiReact,
  DiRuby,
  DiTerminal,
} from 'react-icons/di'
import { AiTwotoneApi } from 'react-icons/ai'
import PropTypes from 'prop-types'

const Icon = ({ name, ...props }) => {
  switch (name) {
    case 'researchgate':
      return <FaResearchgate {...props} />
    case 'linkedin':
      return <FaLinkedin {...props} />
    case 'github':
      return <FaSquareGithub {...props} />
    case 'html':
      return <DiHtml5 {...props} />
    case 'css':
      return <DiCss3 {...props} />
    case 'javascript':
      return <DiJsBadge {...props} />
    case 'nodejs':
      return <DiNodejsSmall {...props} />
    case 'npm':
      return <DiNpm {...props} />
    case 'java':
      return <DiJava {...props} />
    case 'git':
      return <DiGit {...props} />
    case 'dotnet':
      return <DiDotnet {...props} />
    case 'react':
      return <DiReact {...props} />
    case 'ruby':
      return <DiRuby {...props} />
    case 'scripting':
      return <DiTerminal {...props} />
    case 'database':
      return <DiDatabase {...props} />
    case 'api':
      return <AiTwotoneApi {...props} />
  }
  return <FaRegCircleQuestion {...props} />
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Icon
