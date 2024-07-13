const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/**
 * Little utility to parse the bibtex month to how we want to display it. It could have been a simpler map, but this
 * lets us use `Intl.DateFormat` for more future control on how it should be displayed
 *
 * @param {string} bibMonth
 * @returns {string}
 */
const asMonth = (bibMonth) => {
  const monthIdx = months.indexOf(bibMonth)
  if (monthIdx < 0) {
    throw new Error(`Month value '${bibMonth}' could not be converted to a month`)
  }
  return Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, monthIdx, 1))
}

export default asMonth
