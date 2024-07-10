import { asMonth } from '../../utils'
import Authors from './Authors'

const Periodical = ({ entry }) => (
  <>
    {entry.author && (
      <>
        <Authors>{entry.author}</Authors>,{' '}
      </>
    )}
    {entry.title && <>&quot;{entry.title}</>}
    {entry.journal || entry.volume || entry.number || entry.pages || entry.month || entry.year ? (
      <>,&quot; </>
    ) : (
      <>.&quot; </>
    )}
    {entry.journal && (
      <>
        <i>{entry.journal}</i>,{' '}
      </>
    )}
    {entry.volume && <>vol. {entry.volume}, </>}
    {entry.number && <>no. {entry.number}, </>}
    {entry.pages && <>pp. {entry.pages}, </>}
    {entry.month && <>{asMonth(entry.month)} </>}
    {entry.year && <>{entry.year}</>}
    {(entry.journal || entry.volume || entry.number || entry.pages || entry.month || entry.year) && <>.</>}
  </>
)

export default Periodical
