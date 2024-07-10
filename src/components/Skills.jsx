import { useCallback, useState } from 'react'
import { skills } from 'site-config'
import Icon from './Icon'
import styles from './Skills.module.css'

const Skills = () => {
  const [selected, setSelected] = useState(skills.defaultSelected)

  const updateSelected = useCallback((event) => {
    setSelected(event.currentTarget.dataset.text)
  }, [])

  return (
    <div className={styles.breakout}>
      <div className={styles.skills}>
        <h2>{skills.title}</h2>
        {skills.foreword && <p>{skills.foreword}</p>}
        <ul>
          {skills.content.map(({ text, icon }) => (
            <li key={text}>
              <Icon
                name={icon}
                size="2em"
                className={styles.skill}
                title={text}
                data-text={text}
                onClick={updateSelected}
                onKeyDown={updateSelected}
              />
            </li>
          ))}
        </ul>
        {skills.afterword && <p>{skills.afterword}</p>}
        <div className={styles.detail}>{selected}</div>
      </div>
    </div>
  )
}

export default Skills
