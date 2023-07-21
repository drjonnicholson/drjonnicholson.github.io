import { graphql } from "gatsby"

export const publicationFragment = graphql`
  fragment publication on Reference {
    id
    key
    title
    authors
    journal
    date
    raw
    year
    volume
    url
    series
    school
    publisher
    pages
    number
    note
    month
    issn
    isbn
    entry_type
    doi
    booktitle
    author
    address
    abstract
    file {
      publicURL
    }
  }
`
