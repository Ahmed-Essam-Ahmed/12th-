import { createContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'
import { transactionService } from '../services/transactionService'
import { categoryService } from '../services/categoryService'

export const DataContext = createContext(null)

export function DataProvider({ children }) {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])

  const reload = useCallback(() => {
    if (user) {
      setTransactions(transactionService.getAll(user.id))
      setCategories(categoryService.getAll(user.id))
    } else {
      setTransactions([])
      setCategories([])
    }
  }, [user])

  useEffect(() => { reload() }, [reload])

  const addTransaction    = (data)     => { transactionService.add(user.id, data);           reload() }
  const updateTransaction = (id, data) => { transactionService.update(user.id, id, data);    reload() }
  const deleteTransaction = (id)       => { transactionService.delete(user.id, id);          reload() }
  const addCategory       = (data)     => { categoryService.add(user.id, data);              reload() }
  const updateCategory    = (id, data) => { categoryService.update(user.id, id, data);       reload() }
  const deleteCategory    = (id)       => { categoryService.delete(user.id, id);             reload() }

  return (
    <DataContext.Provider value={{
      transactions, categories,
      addTransaction, updateTransaction, deleteTransaction,
      addCategory,   updateCategory,   deleteCategory,
    }}>
      {children}
    </DataContext.Provider>
  )
}