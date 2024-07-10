import { asMonth } from '../../utils'
import Authors from './Authors'

const Proceedings = ({ entry }) => (
  <>
    {entry.author && (
      <>
        <Authors>{entry.author}</Authors>,{' '}
      </>
    )}
    {entry.title && <>'{entry.title},' </>}
    {entry.address && <>{entry.address}: </>}
    {entry.publisher && <>{entry.publisher}, </>}
    {entry.month && <>{asMonth(entry.month)} </>}
    {entry.year && <>{entry.year}</>}.
  </>
)

export default Proceedings
