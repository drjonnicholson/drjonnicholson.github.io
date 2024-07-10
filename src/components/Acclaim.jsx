import { acclaim as config } from 'site-config'
import { useCallback, useMemo, useState } from 'react'
import acclaim from '../acclaim.json'
import styles from './Acclaim.module.css'

const Acclaim = () => {
  const [selected, setSelected] = useState(null)

  const badges = useMemo(() => {
    return acclaim.reduce((acc, badge) => {
      if (badge.is_private_badge) {
        return acc
      }

      acc[badge.id] = {
        id: badge.id,
        title: badge.badge_template.name,
        description: badge.badge_template.description,
        image: badge.image_url,
        issuedBy: badge.issuer.summary,
        issuedAt: new Date(badge.issued_at),
        verify: `https://www.credly.com/badges/${badge.id}`,
      }
      return acc
    }, {})
  }, [])

  const updateSelected = useCallback(
    (event) => {
      const id = event.currentTarget.dataset.badge
      setSelected(badges[id])
    },
    [badges],
  )

  return (
    <div className={styles.breakout}>
      <div className={styles.acclaim}>
        <h3>{config.title}</h3>
        <ul>
          {Object.entries(badges).map(([id, { title, image, issuedBy, issuedAt }]) => (
            <li key={id}>
              <button
                data-badge={id}
                onClick={updateSelected}
                onKeyDown={updateSelected}
                title={`${title}, ${issuedBy} on ${issuedAt.toLocaleDateString()}`}>
                <img src={image} alt={title} />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.detail}>
          {selected ? (
            <>
              <h6>{selected.title}</h6>
              <p>{selected.description}</p>
              <a href={selected.verify}>{config.verify}</a>
            </>
          ) : (
            config.defaultSelected
          )}
        </div>
      </div>
    </div>
  )
}

export default Acclaim
