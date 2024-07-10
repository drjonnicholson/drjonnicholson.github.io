import Authors from './Authors'

const Thesis = ({ entry }) => (
  <>
    {entry.author && (
      <>
        <Authors>{entry.author}</Authors>,{' '}
      </>
    )}
    {entry.title && <>&quot;{entry.title},&quot; </>}
    {entry.type && <>{entry.type} </>}
    {entry.type === 'phdthesis' && <>PhD Thesis</>}
    {entry.type === 'mastersthesis' && <>Masters Thesis</>}
    {entry.school && <>, {entry.school}</>}
    {entry.address && <>, {entry.address}</>}
    {entry.year && <>, {entry.year}</>}.
  </>
)
export default Thesis
