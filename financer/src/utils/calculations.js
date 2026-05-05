export const getTotalIncome = (transactions) =>
  transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)

export const getTotalExpenses = (transactions) =>
  transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)

export const getBalance = (transactions) =>
  getTotalIncome(transactions) - getTotalExpenses(transactions)

export const getByCategory = (transactions, categories) =>
  categories
    .filter((c) => c.type === 'expense')
    .map((cat) => ({
      name: cat.name,
      value: transactions
        .filter((t) => t.type === 'expense' && t.categoryId === cat.id)
        .reduce((sum, t) => sum + t.amount, 0),
      color: cat.color,
    }))
    .filter((c) => c.value > 0)

export const getMonthlyData = (transactions) => {
  const months = {}
  transactions.forEach((t) => {
    const key = new Date(t.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    if (!months[key]) months[key] = { month: key, income: 0, expenses: 0 }
    if (t.type === 'income') months[key].income += t.amount
    else months[key].expenses += t.amount
  })
  return Object.values(months).slice(-6)
}