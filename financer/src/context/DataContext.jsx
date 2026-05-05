import { createContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'
import { transactionService } from '../services/transactionService'
import { categoryService }    from '../services/categoryService'
import { goalService }        from '../services/goalService'
import { budgetService }      from '../services/budgetService'

export const DataContext = createContext(null)

export function DataProvider({ children }) {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [categories,   setCategories]   = useState([])
  const [goals,        setGoals]        = useState([])
  const [budgets,      setBudgets]      = useState([])

  const reload = useCallback(() => {
    if (user) {
      setTransactions(transactionService.getAll(user.id))
      setCategories(categoryService.getAll(user.id))
      setGoals(goalService.getAll(user.id))
      setBudgets(budgetService.getAll(user.id))
    } else {
      setTransactions([]); setCategories([])
      setGoals([]);        setBudgets([])
    }
  }, [user])

  useEffect(() => { reload() }, [reload])

  // Transactions
  const addTransaction    = (d)    => { transactionService.add(user.id, d);       reload() }
  const updateTransaction = (i, d) => { transactionService.update(user.id, i, d); reload() }
  const deleteTransaction = (i)    => { transactionService.delete(user.id, i);    reload() }

  // Categories
  const addCategory    = (d)    => { categoryService.add(user.id, d);       reload() }
  const updateCategory = (i, d) => { categoryService.update(user.id, i, d); reload() }
  const deleteCategory = (i)    => { categoryService.delete(user.id, i);    reload() }

  // Goals
  const addGoal         = (d)    => { goalService.add(user.id, d);               reload() }
  const updateGoal      = (i, d) => { goalService.update(user.id, i, d);         reload() }
  const deleteGoal      = (i)    => { goalService.delete(user.id, i);            reload() }
  const addContribution = (i, c) => { goalService.addContribution(user.id, i, c); reload() }

  // Budgets
  const addBudget    = (d)    => { budgetService.add(user.id, d);       reload() }
  const updateBudget = (i, d) => { budgetService.update(user.id, i, d); reload() }
  const deleteBudget = (i)    => { budgetService.delete(user.id, i);    reload() }

  return (
    <DataContext.Provider value={{
      transactions, categories, goals, budgets,
      addTransaction, updateTransaction, deleteTransaction,
      addCategory,   updateCategory,   deleteCategory,
      addGoal,       updateGoal,       deleteGoal,    addContribution,
      addBudget,     updateBudget,     deleteBudget,
    }}>
      {children}
    </DataContext.Provider>
  )
}