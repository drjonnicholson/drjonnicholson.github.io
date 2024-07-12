const quoteTitle = (title, fields = []) => {
  const punctuation = fields.some(Boolean) ? ',' : '.'
  return `"${title}${punctuation}"`
}

export default quoteTitle
