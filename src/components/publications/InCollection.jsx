import Authors from './Authors'

const InCollection = ({ entry }) => (
  <>
    {entry.author && (
      <>
        <Authors>{entry.author}</Authors>,{' '}
      </>
    )}
    {entry.title && <>&quot;{entry.title}</>}
    {entry.booktitle || entry.edition || entry.editor ? <>,&quot; </> : <>.&quot; </>}
    {entry.booktitle && (
      <>
        in <i>{entry.booktitle}</i>
      </>
    )}
    {entry.edition && <>, {entry.edition} ed.</>}
    {entry.editor && <>, {entry.editor}, </>}
    {(entry.booktitle || entry.edition || entry.editor) && <>, </>}
    {entry.year && <> {entry.year}</>}
    {entry.volume && <>, vol. {entry.volume}</>}
    {entry.pages && <>, pages {entry.pages}</>}.
  </>
)

export default InCollection
