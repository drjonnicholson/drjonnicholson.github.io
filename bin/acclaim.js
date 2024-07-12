#!/usr/bin/env node

import { writeFileSync } from 'fs'
import pkg from '../package.json'
import { resolve } from 'path'

const download = async () => {
  try {
    const url = `https://www.credly.com/users/${pkg.acclaim.credly}/badges.json`
    const response = await fetch(url)
    if (response.status == 200) {
      const json = await response.json()
      writeFileSync(resolve('./src/acclaim.json'), JSON.stringify(json.data, null, 2), { encoding: 'utf-8' })
    }
  } catch (error) {
    console.error(error)
  }
}
download()
