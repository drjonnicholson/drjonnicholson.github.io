import React, { useState } from 'react'
import useSiteMetadata from '../hooks/useSiteMetadata'
import usePublicationsGrouped from '../hooks/usePublicationsGrouped'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Collapse from 'react-bootstrap/Collapse'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFilePdf, faExternalLink } from '@fortawesome/pro-light-svg-icons'
import { FiExternalLink } from 'react-icons/fi'
import { GrDocumentPdf } from 'react-icons/gr'
import { parseName } from 'humanparser'
import { andList } from 'human-list'
import Highlighter from 'react-highlight-words';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'prismjs-bibtex';

const Publications = () => {
  const groups = usePublicationsGrouped()
  const {publications: { highlight }} = useSiteMetadata()

  if(!groups) {
    return null
  }

  return (
    <Row id='publications' className='py-5'>
      <Col>
        <h3>Selected Publications</h3>
        {groups.map(({ fieldValue, totalCount, edges }) => 
          <PublicationGroup key={fieldValue} type={fieldValue} count={totalCount} publications={edges} highlight={highlight} />)
        }
        <p className='small'>
          This material is presented to ensure timely dissemination of scholarly and technical work. Copyright and all rights therein are retained by authors or by other copyright holders. All persons copying this information are expected to adhere to the terms and constraints invoked by each author’s copyright. In most cases, these works may not be reposted without the explicit permission of the copyright holder.
        </p>
      </Col>
    </Row>
  )
}

const PublicationGroup = ({type, count, publications, highlight}) => {
  if(!count) {
    return null
  }
  return (
    <div>
      <h4>{GroupName(type)}</h4>
      {/* <small>{count} publications</small> */}
      <ul className='bibliography list-unstyled'>
        {publications.map(({node}) => <Publication key={node.key} entry={node} highlight={highlight} />)}
      </ul>
    </div>
  )
}

const GroupName = (type) => {
  switch(type) {
    case 'article': return 'Journals';
    case 'book': return 'Books and book chapters';
    case 'inproceedings': return 'Conferences and workshops';
    case 'phdthesis': return 'PhD Thesis';
    default: return 'Unknown';
  }
}

const Publication = ({entry, highlight}) => {
  const [viewNote, setViewNote] = useState(false);
  const [viewAbstract, setViewAbstract] = useState(false);
  const [viewRaw, setViewRaw] = useState(false);
  
  const toggleNote = () => {
    setViewNote(viewNote => !viewNote)
  }

  const toggleAbstract = () => {
    setViewAbstract(viewAbstract => !viewAbstract)
  }

  const toggleRaw = () => {
    setViewRaw(viewRaw => !viewRaw)
  }

  return (
    <li id={`publication_${entry.key}`} className='publication mt-1 mb-2 '>
      <RenderPublication entry={entry} highlight={highlight} />
      <ButtonToolbar aria-label='Publication Actions'>
        <ButtonGroup aria-label='Publication Detail' className='me-4'>
          <Button variant='outline-secondary' size='sm' disabled={!entry.note} active={viewNote} onClick={toggleNote} aria-controls={`publication_${entry.key}_note`} aria-expanded={viewNote}>Note</Button>
          <Button variant='outline-secondary' size='sm' disabled={!entry.abstract} active={viewAbstract} onClick={toggleAbstract} aria-controls={`publication_${entry.key}_abstract`} aria-expanded={viewAbstract}>Abstract</Button>
          <Button variant='outline-secondary' size='sm' onClick={toggleRaw} active={viewRaw} aria-controls={`publication_${entry.key}_raw`} aria-expanded={viewRaw}>BibTex</Button>
        </ButtonGroup>
        <ButtonGroup aria-label='Publication Copies'>
          <Button variant='outline-secondary' size='sm' disabled={!entry.file} href={entry.file ? entry.file.publicURL : '#'} title='PDF' ><GrDocumentPdf /> PDF</Button>
          <Button variant='outline-secondary' size='sm' disabled={!entry.doi} href={entry.doi ? `http://dx.doi.org/${entry.doi}` : '#'} title='DOI'><FiExternalLink /> DOI</Button>
          <Button variant='outline-secondary' size='sm' disabled={!entry.url} href={entry.url ? entry.url : '#'} title='Link'><FiExternalLink /> Link</Button>
        </ButtonGroup>
      </ButtonToolbar>
      <div className='my-1'>
        {entry.note && 
          <Collapse in={viewNote}>
            <aside id={`publication_${entry.key}_note`} className='publication_note'>
              <header><h6>Note</h6></header>
              <p>{entry.note}</p>
            </aside>
          </Collapse>
        }
        {entry.abstract &&
          <Collapse in={viewAbstract}>
            <aside id={`publication_${entry.key}_abstract`} className='publication_abstract'>
              <header><h6>Abstract</h6></header>
              <blockquote>{entry.abstract}</blockquote>
            </aside>
          </Collapse>
        }
        {
          <Collapse in={viewRaw}>
            <aside id={`publication_${entry.key}_raw`} className='publication_raw'>
              <header><h6>BibTex</h6></header>
              <SyntaxHighlighter language='bibtex' style={dark}>{entry.raw}</SyntaxHighlighter>
            </aside>
          </Collapse>
        }
      </div>
    </li>
  )
}

const RenderPublication = ({entry, highlight}) => {
  let authors = entry.author
  if (authors) {
    authors = andList(authors.split(' and ').map(author => {
      let attrs = parseName(author)
      let name = []
      attrs.firstName && name.push(`${attrs.firstName.charAt(0)}.`)
      attrs.middleName && name.push(`${attrs.middleName.charAt(0)}.`)
      attrs.lastName && name.push(attrs.lastName)

      return name.join(' ')
    }))
    authors = <Highlighter
      highlightClassName='font-weight-bold'
      searchWords={highlight}
      autoEscape={true}
      textToHighlight={authors}
      highlightTag = {({ children }) => (
        <strong>{children}</strong>
      )}
    />
  } else {
    authors = 'Unknown'
  }
  let RenderComponent = null
  switch(entry.entry_type) {
    case 'proceedings':
      RenderComponent = RenderProceedings
      break
    case 'unpublished':
      RenderComponent = RenderProceedings
      break
    case 'misc':
      RenderComponent = RenderProceedings
      break
    case 'book':
      RenderComponent = RenderBook
      break
    case 'inbook': 
      RenderComponent = RenderInCollection
      break
    case 'incollection':
      RenderComponent = RenderInCollection
      break
    case 'article':
      RenderComponent = RenderPeriodical
      break
    case 'conference':
      RenderComponent = RenderConference
      break
    case 'inproceedings':
      RenderComponent = RenderInProceedings
      break
    case 'phdthesis':
      RenderComponent = RenderThesis
      break
    case 'mastersthesis':
      RenderComponent = RenderThesis
      break
    case 'techreport':
      RenderComponent = RenderTechReport
      break
    default: 
      RenderComponent = RenderPeriodical
      break
  }
  return <RenderComponent entry={entry} authors={authors} highlight={highlight} />
}

const RenderProceedings = ({entry, authors}) => (
  <>
    {authors && <>{authors}, </>}
    {entry.title && <>'{entry.title},' </>}
    {entry.address && <>{entry.address}: </>}
    {entry.publisher && <>{entry.publisher}, </>}
    {entry.month && <>{asMonth(entry.month)} </>}
    {entry.year && <>{entry.year}</>}
    .
  </>
)

const RenderBook = ({entry, authors}) => (
  <>
    {authors && <>{authors}, </>}
    {entry.title && <>&quot;{entry.title},&quot; </>}
    {entry.edition && <>{entry.edition} ed., </>}
    {entry.editor && <>{entry.editor}, </>}
    {entry.address && <>{entry.address}: </>}
    {entry.publisher && <>{entry.publisher}, </>}
    {entry.year && <>{entry.year}</>}
    .
  </>
)

const RenderInCollection = ({entry, authors}) => (
  <>
    {authors && <>{authors}, </>}
    {entry.title && <>&quot;{entry.title}</>}
    {(entry.booktitle || entry.edition || entry.editor) ? <>,&quot; </> : <>.&quot; </>}
    {entry.booktitle && <>in <i>{entry.booktitle}</i></>}
    {entry.edition && <>, {entry.edition} ed.</>}
    {entry.editor && <>, {entry.editor}, </>}
    {(entry.booktitle || entry.edition || entry.editor) && <>, </>}
    {entry.year && <> {entry.year}</>}
    {entry.volume && <>, vol. {entry.volume}</>}
    {entry.pages && <>, pages {entry.pages}</>}
    .
  </>
)

const RenderPeriodical = ({entry, authors, highlight}) => (
  <>
    {authors && <>{authors}, </>}
    {entry.title && <>&quot;{entry.title}</>}
    {(entry.journal || entry.volume || entry.number || entry.pages || entry.month || entry.year) ? <>,&quot; </> : <>.&quot; </>}
    {entry.journal && <><i>{entry.journal}</i>, </>}
    {entry.volume && <>vol. {entry.volume}, </>}
    {entry.number && <>no. {entry.number}, </>}
    {entry.pages && <>pp. {entry.pages}, </>}
    {entry.month && <>{asMonth(entry.month)} </>}
    {entry.year && <>{entry.year}</>}
    {(entry.journal || entry.volume || entry.number || entry.pages || entry.month || entry.year) && <>.</>}
  </>
)

const RenderConference = ({entry, authors}) => (
  <>
    {authors && <>{authors}, </>}
    {entry.title && <>{entry.title}. </>}
    {entry.booktitle && <><i>{entry.booktitle}</i>, </>}
    {entry.series && <>{entry.series}, </>}
    {entry.volume && <>volume {entry.volume}, </>}
    {entry.pages && <>pages {entry.pages}. </>}
    {entry.address && <>{entry.address}. </>}
    {entry.publisher && <>{entry.publisher}, </>}
    {entry.month && <>{asMonth(entry.month)} </>}
    {entry.year && <>{entry.year}</>}
    .
  </>
)

const RenderInProceedings = ({entry, authors}) => (
  <>
    {authors && <>{authors}, </>}
    {entry.title && <>&quot;{entry.title}</>}
    {(entry.booktitle || entry.address) ? <>,&quot; </> : <>.&quot; </>}
    {entry.booktitle && <>in <i>{entry.booktitle}</i></>}
    {entry.address && <>, {entry.address}</>}
    {(entry.booktitle || entry.address) && <>,</>}
    {entry.month && <> {asMonth(entry.month)}</>}
    {entry.year && <> {entry.year}</>}
    {entry.pages && <>, pages {entry.pages}</>}
    .
  </>
)

const RenderThesis = ({entry, authors}) => (
  <>
    {authors && <>{authors}, </>}
    {entry.title && <>&quot;{entry.title},&quot; </>}
    {entry.type && <>{entry.type} </>}
    {entry.entry_type === 'phdthesis' && <>PhD Thesis</>}
    {entry.entry_type === 'mastersthesis' && <>Masters Thesis</>}
    {entry.school && <>, {entry.school}</>}
    {entry.address && <>, {entry.address}</>}
    {entry.year && <>, {entry.year}</>}
    .
  </>
)

const RenderTechReport = ({entry, authors}) => (
  <>
    {authors && <>{authors}, </>}
    {entry.title && <>&quot;{entry.title},&quot; </>}
    {entry.institution && <>{entry.institution}</>}
    {entry.address && <>, {entry.address}</>}
    {(entry.type || entry.number) && <>, </>}
    {entry.type && <>{entry.type} </>}
    {entry.number && <>{entry.number}</>}
    {(entry.type || entry.number) && <>, </>}
    {entry.month && <>{asMonth(entry.month)} </>}
    {entry.year && <>{entry.year}</>}
    .
  </>
)

const asMonth = (bibMonth) => {
  return Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`1/${bibMonth}/2000`))
}

export default Publications

/*
Original reference entry template:

<h3>Selected Publications</h3>
@{group@
<div class='papercite'>
	@?groupkey@
		<div class='papercite_heading'>@groupkey@</div>
	@;groupkey@
	<ul class='papercite_bibliography papercite_bibcite @?groupkey@papercite_grouped@;groupkey@'>
	@{entry@
		<li id='paperkey_@papercite_id@' class='papercite_entry'>[@key@]
		@?pdf@
			<a href='@pdf@' title='Download PDF' class='papercite_link papercite_pdf' onclick='ga('send', 'event', 'publication', 'PDF', '@entrykey@');'>
				<img src='@WP_PLUGIN_URL@/papercite/img/pdf.png' alt='[PDF]'/>
			</a>
		@;pdf@
		@?doi@
			<a href='http://dx.doi.org/@doi@' title='Go to document' class='papercite_link papercite_doi' onclick='ga('send', 'event', 'publication', 'DOI', '@entrykey@');'>
				<img src='@WP_PLUGIN_URL@/papercite/img/external.png' width='10' height='10' alt='[DOI]' />
			</a>
		@;doi@
		@#entry@<br/>
		<div class='papercite_controls'>
			@?note@
				<a href='javascript:void(0);' id='papercite_note_@papercite_id@' class='papercite_link papercite_toggle' title='Click to view notes'>[Notes]</a>
			@;note@
			@?abstract@
				<a href='javascript:void(0);' id='papercite_abstract_@papercite_id@' class='papercite_link papercite_toggle' title='Click to view abstract'>[Abstract]</a>
			@;abstract@
				<a href='javascript:void(0);' id='papercite_@papercite_id@' class='papercite_link papercite_toggle' title='Click to view Bibtex'>[BibTex]</a>
			@?url@
				<a href='@url@' class='papercite_link' title='External link for @title@ (@year@)'>[Link]</a>
			@;url@
		</div>
		@?note@
			<aside id='papercite_note_@papercite_id@_block' class='papercite_note'>
				<header>Notes</header>
				<notes>@note@</p>
			</aside>
		@;note@
		@?abstract@
			<aside id='papercite_abstract_@papercite_id@_block' class='papercite_abstract'>
				<header>Abstract</header>
				<blockquote>@abstract@</blockquote>
			</aside>
		@;abstract@
			<aside class='papercite_bibtex' id='papercite_@papercite_id@_block'>
				<header>BibTex</header>
				<pre lang='BibTeX' escaped='true'>@bibtex@</pre>
			</aside>
		</li>
	@}entry@
	</ul>
</div>
@}group@

See <a href='http://www.drjonnicholson.com/research'>all publications</a>.
*/

/*
Original IEEE template from old site:

<formats>

<property name='titleCapitalization' value='0'/>
<property name='primaryCreatorFirstStyle' value='0'/>
<property name='primaryCreatorOtherStyle' value='0'/>
<property name='primaryCreatorInitials' value='0'/>
<property name='primaryCreatorFirstName' value='1'/>
<property name='otherCreatorFirstStyle' value='1'/>
<property name='otherCreatorOtherStyle' value='1'/>
<property name='otherCreatorInitials' value='0'/>
<property name='dayFormat' value='0'/>
<property name='otherCreatorFirstName' value='1'/>
<property name='primaryCreatorList' value='0'/>
<property name='otherCreatorList' value='0'/>
<property name='monthFormat' value='2'/>
<property name='editionFormat' value='1'/>
<property name='primaryCreatorListMore' value=''/>
<property name='primaryCreatorListLimit' value=''/>
<property name='dateFormat' value='1'/>
<property name='primaryCreatorListAbbreviation' value=''/>
<property name='otherCreatorListMore' value=''/>
<property name='runningTimeFormat' value='0'/>
<property name='primaryCreatorRepeatString' value=''/>
<property name='primaryCreatorRepeat' value='0'/>
<property name='otherCreatorListLimit' value=''/>
<property name='otherCreatorListAbbreviation' value=''/>
<property name='pageFormat' value='2'/>
<property name='editorSwitch' value='0'/>
<property name='editorSwitchIfYes' value=''/>
<property name='primaryCreatorSepFirstBetween' value=', '/>
<property name='primaryCreatorSepNextBetween' value=', '/>
<property name='primaryCreatorSepNextLast' value=', and '/>
<property name='otherCreatorSepFirstBetween' value=', '/>
<property name='otherCreatorSepNextBetween' value=', '/>
<property name='otherCreatorSepNextLast' value=', and '/>
<property name='primaryTwoCreatorsSep' value=' and '/>
<property name='otherTwoCreatorsSep' value=' and '/>
<property name='userMonth_1' value='Jan.'/>
<property name='userMonth_2' value='Feb.'/>
<property name='userMonth_3' value='Mar.'/>
<property name='userMonth_4' value='Apr.'/>
<property name='userMonth_5' value='May'/>
<property name='userMonth_6' value='June'/>
<property name='userMonth_7' value='July'/>
<property name='userMonth_8' value='Aug.'/>
<property name='userMonth_9' value='Sept.'/>
<property name='userMonth_10' value='Oct.'/>
<property name='userMonth_11' value='Nov.'/>
<property name='userMonth_12' value='Dec.'/>
<property name='dateRangeDelimit1' value='-'/>
<property name='dateRangeDelimit2' value='/'/>
<property name='dateRangeSameMonth' value='1'/>

<format types='proceedings unpublished misc'>
@?author@@author@, @;@@?title@&lt;span style=&quot;font-style: italic&quot;&gt;@title@&lt;/span&gt;, @;@@?address@@address@: @;@@?publisher@@publisher@@;@@?month@, @month@@;@@?year@, @year@@;@.
</format>

<format types='book'>
@?author@@author@, @;@@?title@&lt;span style=&quot;font-style: italic&quot;&gt;@title@&lt;/span&gt;@;@@?edition@, @edition@ ed.@;@@?editor@, @editor@, @?#editor&gt;1@Eds@:editor@Ed@;editor@.@;@@?address||publisher||year||volume@, @:@@;@@?address@@address@: @;@@?publisher@@publisher@@;@@?year@, @year@@;@@?volume@, vol. @volume@@;@@?address||publisher||year||volume@.@:@@;@
</format>

<format types='inbook incollection'>
@?author@@author@, @;@@?title@&quot;@title@@;@@?bookitle||edition||editor@,&quot; @:@.&quot; @;@@?bookitle@in &lt;span style=&quot;font-style: italic&quot;&gt;@bookitle@&lt;/span&gt;@;@@?edition@, @edition@ ed.@;@@?editor@, @editor@, @?#editor&gt;1@Eds@:editor@Ed@;editor@.@;@@?bookitle||edition||editor@, @:@@;@@?address@@address@: @;@@?publisher@@publisher@@;@@?year@, @year@@;@@?volume@, vol. @volume@@;@@?pages@, pages @pages@@;@.
</format>

<format types='article'>
@?author@@author@, @;@@?title@@title@. @;@@?journal@&lt;em&gt;@journal@&lt;/em&gt;, @;@@?volume@@volume@@;@@?number@(@number@)@;@@?pages@:@pages@@;@@?year@, @year@@;@.
</format>

<format types='conference'>
@?author@@author@, @;@@?title@@title@. @;@@?booktitle@In &lt;em&gt;@booktitle@&lt;/em&gt;, @;@@?series@@series@, @;@@?volume@volume @volume@, @;@@?pages@pages @pages@. @;@@?address@@address@. @;@@?publisher@@publisher@, @;@@?date@@date@ @;@@?year@@year@@;@.
</format>

<format types='inproceedings'>
@?author@@author@, @;@@?title@&quot;@title@@;@@?booktitle||address@,&quot; @:@.&quot; @;@@?booktitle@in &lt;span style=&quot;font-style: italic&quot;&gt;@booktitle@&lt;/span&gt;@;@@?address@, @address@@;@@?booktitle||address@, @:@@;@@?date@@date@@;@@?year@ @year@@;@@?pages@, pages @pages@@;@.
</format>

<format types='phdthesis mastersthesis'>
@?author@@author@, @;@@?title@&quot;@title@,&quot; @;@@?type@@type@ @;@@?entrytype=phdthesis||entrytype=mastersthesis@@?entrytype=phdthesis@PhD Thesis@;@@?entrytype=mastersthesis@Masters Thesis@;@@;@@?school@, @school@@;@@?address@, @address@@;@@?year@, @year@@;@.
</format>

<format types='techreport'>
@?author@@author@, @;@@?title@&quot;@title@,&quot; @;@@?institution@@institution@@;@@?address@, @address@@;@@?type||number@, @:@@;@@?type@@type@ @;@@?number@@number@@;@@?type||number@, @:@@;@@?date@@date@ @;@@?year@@year@@;@.
</format>

<format types='#'>
@?author@@author@, @;@@?title@&quot;@title@@;@@?journal||volume||number||pages||year@,&quot; @:@.&quot; @;@@?journal@&lt;span style=&quot;font-style: italic&quot;&gt;@journal@&lt;/span&gt;@;@@?volume@, vol. @volume@@;@@?number@, iss. @number@@;@@?pages@, pages @pages@@;@@?year@, @year@@;@@?journal||volume||number||pages||year@.@:@@;@
</format>

<!--
<format types='conference'>
@?author@@author@, @;@
@?title@@title@. @;@
@?booktitle@In &lt;em&gt;@booktitle@&lt;/em&gt;, @;@
@?series&&volume@
	@?series=Lecture Notes in Computer Science@
		LNCS @volume@:@?pages@@pages@@;@. 
	@:@
		@series@ @volume@, @?pages@pages @pages@. @;@
	@;@
@:series&&volume@
	@?pages@pages @pages@. @;@
@;series&&volume@
@?address@@address@. @;@
@?publisher@@publisher@, @;@
@?date@@date@ @;@
@?year@@year@@;@.
</format>
-->
</formats> 
*/