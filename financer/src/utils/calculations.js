// ── Transaction calculations ─────────────────
export const getTotalIncome = (transactions) =>
  transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)

export const getTotalExpenses = (transactions) =>
  transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)

export const getBalance = (transactions) =>
  getTotalIncome(transactions) - getTotalExpenses(transactions)

export const getByCategory = (transactions, categories) =>
  categories
    .filter(c => c.type === 'expense')
    .map(cat => ({
      name: cat.name,
      value: transactions
        .filter(t => t.type === 'expense' && t.categoryId === cat.id)
        .reduce((sum, t) => sum + t.amount, 0),
      color: cat.color,
    }))
    .filter(c => c.value > 0)

export const getMonthlyData = (transactions) => {
  const months = {}
  transactions.forEach(t => {
    const key = new Date(t.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    if (!months[key]) months[key] = { month: key, income: 0, expenses: 0 }
    if (t.type === 'income') months[key].income += t.amount
    else months[key].expenses += t.amount
  })
  return Object.values(months).slice(-6)
}

// ── Budget calculations ──────────────────────
export const getBudgetSpent = (transactions, categoryId, month) =>
  transactions
    .filter(t =>
      t.type === 'expense' &&
      t.categoryId === categoryId &&
      t.date.startsWith(month)
    )
    .reduce((sum, t) => sum + t.amount, 0)

export const getBudgetProgress = (spent, amount) =>
  amount > 0 ? Math.min((spent / amount) * 100, 100) : 0

// ── Goal calculations ────────────────────────
export const getGoalProgress = (goal) =>
  goal.targetAmount > 0
    ? Math.min((goal.savedAmount / goal.targetAmount) * 100, 100)
    : 0

export const getGoalMonthsRemaining = (deadline) => {
  const now = new Date()
  const end = new Date(deadline)
  const months =
    (end.getFullYear() - now.getFullYear()) * 12 +
    (end.getMonth() - now.getMonth())
  return Math.max(0, months)
}

export const getGoalMonthlyNeeded = (goal) => {
  const remaining = goal.targetAmount - goal.savedAmount
  const months = getGoalMonthsRemaining(goal.deadline)
  return months > 0 ? remaining / months : remaining
}

export const isGoalOnTrack = (goal) => {
  const created  = new Date(goal.createdAt)
  const deadline = new Date(goal.deadline)
  const now      = new Date()
  const totalMs  = deadline - created
  if (totalMs <= 0) return false
  const expectedProgress = Math.min(((now - created) / totalMs) * 100, 100)
  return getGoalProgress(goal) >= expectedProgress
}

export const getCurrentMonthData = (transactions) => {
  const now   = new Date()
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const monthTx = transactions.filter(t => t.date.startsWith(month))
  return {
    income:   monthTx.filter(t => t.type === 'income').reduce((s, t)  => s + t.amount, 0),
    expenses: monthTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    net:      monthTx.filter(t => t.type === 'income').reduce((s, t)  => s + t.amount, 0) -
              monthTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    count:    monthTx.length,
    month,
  }
}