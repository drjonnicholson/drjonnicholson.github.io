import styled from './Publication.module.css'
import Entry from './publications/Entry'

const Publication = ({ entry }) => {
  return (
    <li className={styled.publication}>
      <Entry entry={entry} />
      <details>
        <summary>Detail</summary>
        <div>
          <aside>
            <h6>Links</h6>
            <ul>
              {entry.pdf && (
                <li>
                  <a href={entry.pdf} title="PDF">
                    Download a copy (PDF)
                  </a>
                </li>
              )}
              {entry.doi && (
                <li>
                  <a href={`http://dx.doi.org/${entry.doi}`} title="DOI">
                    Digital Object Identifier (DOI)
                  </a>
                </li>
              )}
              {entry.url && (
                <li>
                  <a href={entry.url} title="Link">
                    External link
                  </a>
                </li>
              )}
            </ul>
          </aside>
          {entry.note && (
            <aside>
              <h6>Note</h6>
              <p>{entry.note}</p>
            </aside>
          )}
          {entry.abstract && (
            <aside>
              <h6>Abstract</h6>
              <blockquote>{entry.abstract}</blockquote>
            </aside>
          )}
          {
            <aside>
              <h6>BibTex</h6>
              <code>
                <pre>{entry.raw}</pre>
              </code>
            </aside>
          }
        </div>
      </details>
    </li>
  )
}

export default Publication
