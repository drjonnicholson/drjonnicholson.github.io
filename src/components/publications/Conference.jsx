import { asMonth } from '../../utils'
import Authors from './Authors'

const Conference = ({ entry }) => (
  <>
    {entry.author && (
      <>
        <Authors>{entry.author}</Authors>,{' '}
      </>
    )}
    {entry.title && <>{entry.title}. </>}
    {entry.booktitle && (
      <>
        <i>{entry.booktitle}</i>,{' '}
      </>
    )}
    {entry.series && <>{entry.series}, </>}
    {entry.volume && <>volume {entry.volume}, </>}
    {entry.pages && <>pages {entry.pages}. </>}
    {entry.address && <>{entry.address}. </>}
    {entry.publisher && <>{entry.publisher}, </>}
    {entry.month && <>{asMonth(entry.month)} </>}
    {entry.year && <>{entry.year}</>}.
  </>
)

export default Conference
