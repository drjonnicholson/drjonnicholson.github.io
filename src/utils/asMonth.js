const asMonth = (bibMonth) => {
  return Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`1/${bibMonth}/2000`))
}

export default asMonth
