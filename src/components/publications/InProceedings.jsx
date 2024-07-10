import { asMonth } from '../../utils'
import Authors from './Authors'

const InProceedings = ({ entry }) => (
  <>
    {entry.author && (
      <>
        <Authors>{entry.author}</Authors>,{' '}
      </>
    )}
    {entry.title && <>&quot;{entry.title}</>}
    {entry.booktitle || entry.address ? <>,&quot; </> : <>.&quot; </>}
    {entry.booktitle && (
      <>
        in <i>{entry.booktitle}</i>
      </>
    )}
    {entry.address && <>, {entry.address}</>}
    {(entry.booktitle || entry.address) && <>,</>}
    {entry.month && <> {asMonth(entry.month)}</>}
    {entry.year && <> {entry.year}</>}
    {entry.pages && <>, pages {entry.pages}</>}.
  </>
)

export default InProceedings
