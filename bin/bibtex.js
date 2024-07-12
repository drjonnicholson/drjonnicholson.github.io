#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import pkg from '../package.json'
import { BibtexParser } from 'bibtex-js-parser'
import { resolve } from 'path'
import { andList } from 'human-list'
import humanparser from 'humanparser'

const bibtex = readFileSync(resolve('./public/publications/research.bib')).toString('utf-8')
const json = BibtexParser.parseToJSON(bibtex)

/** @type {Record<string, import('bibtex-js-parser').Entry[]>} */
const grouped = json.reduce((entries, entry) => {
  if (entry.file) {
    entry.pdf = `/publications/${entry.file}`
  }

  const authors = (entry.author || 'Unknown').split(' and ').map((author) => {
    let attrs = humanparser.parseName(author)
    let name = []
    attrs.firstName && name.push(`${attrs.firstName.charAt(0)}.`)
    attrs.middleName && name.push(`${attrs.middleName.charAt(0)}.`)
    attrs.lastName && name.push(attrs.lastName)

    return name.join(' ')
  })
  entry.author = andList(authors)

  entries[entry.type] = entries[entry.type] || []
  entries[entry.type].push(entry)
  return entries
}, {})

const publications = pkg.publications.order.reduce((entries, key) => {
  entries.push({
    title: pkg.publications.humanize[key],
    content: grouped[key],
  })
  return entries
}, [])

writeFileSync(resolve('./src/publications.json'), JSON.stringify(publications, null, 2), { encoding: 'utf-8' })
