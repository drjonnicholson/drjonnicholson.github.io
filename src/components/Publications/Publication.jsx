import Entry from './Entry'
import styled from './Publication.module.css'
import PropTypes from 'prop-types'

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

Publication.propTypes = {
  entry: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    raw: PropTypes.string.isRequired,
    pdf: PropTypes.string,
    doi: PropTypes.string,
    url: PropTypes.string,
    note: PropTypes.string,
    abstract: PropTypes.string,
  }).isRequired,
}

export default Publication
