import { asMonth } from '../../utils'
import Authors from './Authors'

const TechReport = ({ entry }) => (
  <>
    {entry.author && (
      <>
        <Authors>{entry.author}</Authors>,{' '}
      </>
    )}
    {entry.title && <>&quot;{entry.title},&quot; </>}
    {entry.institution && <>{entry.institution}</>}
    {entry.address && <>, {entry.address}</>}
    {(entry.type || entry.number) && <>, </>}
    {entry.type && <>{entry.type} </>}
    {entry.number && <>{entry.number}</>}
    {(entry.type || entry.number) && <>, </>}
    {entry.month && <>{asMonth(entry.month)} </>}
    {entry.year && <>{entry.year}</>}.
  </>
)

export default TechReport
