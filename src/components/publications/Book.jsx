import Authors from './Authors'

const Book = ({ entry }) => (
  <>
    {entry.author && (
      <>
        <Authors>{entry.author}</Authors>,{' '}
      </>
    )}
    {entry.title && <>&quot;{entry.title},&quot; </>}
    {entry.edition && <>{entry.edition} ed., </>}
    {entry.editor && <>{entry.editor}, </>}
    {entry.address && <>{entry.address}: </>}
    {entry.publisher && <>{entry.publisher}, </>}
    {entry.year && <>{entry.year}</>}.
  </>
)

export default Book
