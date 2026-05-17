import { createContext, useState, useEffect, useCallback } from 'react'
import { useAuth }            from '../hooks/useAuth'
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
  const [loading,      setLoading]      = useState(false)

  const reload = useCallback(async () => {
    if (!user) {
      setTransactions([]); setCategories([])
      setGoals([]);        setBudgets([])
      return
    }
    setLoading(true)
    try {
      const [txs, cats, gls, bds] = await Promise.all([
        transactionService.getAll(),
        categoryService.getAll(),
        goalService.getAll(),
        budgetService.getAll(),
      ])
      setTransactions(txs)
      setCategories(cats)
      setGoals(gls)
      setBudgets(bds)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => { reload() }, [reload])

  const addTransaction    = async (d)    => { await transactionService.add(d);        await reload() }
  const updateTransaction = async (i, d) => { await transactionService.update(i, d);  await reload() }
  const deleteTransaction = async (i)    => { await transactionService.delete(i);     await reload() }

  const addCategory    = async (d)    => { await categoryService.add(d);       await reload() }
  const updateCategory = async (i, d) => { await categoryService.update(i, d); await reload() }
  const deleteCategory = async (i)    => { await categoryService.delete(i);    await reload() }

  const addGoal         = async (d)    => { await goalService.add(d);                await reload() }
  const updateGoal      = async (i, d) => { await goalService.update(i, d);          await reload() }
  const deleteGoal      = async (i)    => { await goalService.delete(i);             await reload() }
  const addContribution = async (i, c) => { await goalService.addContribution(i, c); await reload() }

  const addBudget    = async (d)    => { await budgetService.add(d);       await reload() }
  const updateBudget = async (i, d) => { await budgetService.update(i, d); await reload() }
  const deleteBudget = async (i)    => { await budgetService.delete(i);    await reload() }

  return (
    <DataContext.Provider value={{
      transactions, categories, goals, budgets, loading,
      addTransaction, updateTransaction, deleteTransaction,
      addCategory,   updateCategory,   deleteCategory,
      addGoal,       updateGoal,       deleteGoal,    addContribution,
      addBudget,     updateBudget,     deleteBudget,
    }}>
      {children}
    </DataContext.Provider>
  )
}