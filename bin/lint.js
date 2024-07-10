#!/usr/bin/env node
import { ESLint } from 'eslint'
import { mkdirSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import StyleLint from 'stylelint'
import stylelintHtmlFormatter from 'stylelint-html-reporter'

const doEslint = async (cwd, fix, writeTo) => {
  const eslint = new ESLint({
    cwd,
    overrideConfigFile: resolve(cwd, '.eslintrc.cjs'),
    fix,
    ignorePath: resolve(cwd, '.eslintignore'),
    reportUnusedDisableDirectives: 'error',
  })

  const htmlFormatter = await eslint.loadFormatter('html')
  const consoleFormatter = await eslint.loadFormatter('stylish')
  const results = await eslint.lintFiles([join(cwd, '**', '*.{js,jsx,cjs,json}')])

  writeFileSync(writeTo('eslint.html'), await htmlFormatter.format(results), { encoding: 'utf8' })
  console.log(await consoleFormatter.format(results))

  const counts = results.reduce(
    (accumulator, fileResult) => ({
      err: accumulator.err + fileResult.errorCount,
      warning: accumulator.warning + fileResult.warningCount,
    }),
    { err: 0, warning: 0 },
  )

  if (counts.err + counts.warning > 0) {
    console.error(`ESLint completed with errors  ${counts.err} errors and ${counts.warning} warnings`)
    return
  }

  console.log('ESLint completed, no issues reported')
}

const doStylelint = async (cwd, fix, writeTo) => {
  const verbose = await StyleLint.formatters.verbose
  const report = await StyleLint.lint({
    cwd,
    files: '**/*.{css}',
    fix,
    cache: false,
    reportNeedlessDisables: true,
    reportInvalidScopeDisables: true,
    reportDescriptionlessDisables: true,
    ignorePath: resolve(cwd, '.stylelintignore'),
    allowEmptyInput: true,
    formatter: (results, returnValue) => {
      stylelintHtmlFormatter({ filename: writeTo('stylelint.html') })(results)
      console.log(verbose(results, returnValue))
      return ''
    },
  })

  if (report.errored) {
    console.error('Stylelint completed, issues found')
  } else {
    console.log('Stylelint completed, no issues reported')
  }
}

const lint = async () => {
  const cwd = process.cwd()
  const fix = process.argv.includes('--fix')
  const writeTo = (filename) => resolve(cwd, 'reports', filename)

  mkdirSync(resolve(cwd, 'reports'), { recursive: true })

  await doEslint(cwd, fix, writeTo)
  await doStylelint(cwd, fix, writeTo)
}

lint()
