export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
  }).format(amount)

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })