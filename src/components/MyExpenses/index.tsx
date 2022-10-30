import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import './style.css'
import Card from '../Card'
import { searchExpense } from '../../redux/actions'

const ExpenseList = () => {
    interface category {
        id: number;
        title: string;
        icon: string;
        color: string;
    }

    interface Expense {
        title: string;
        amount: string;
        category: category;
        createdAt: Date;
    }

    interface MyExpenseState {
        expenses: {
            query: string;
            expenseList: Expense[];
        }
    }

    const { expenseList: list, query } = useSelector((state: MyExpenseState) => state.expenses)
    const filteredList = list.filter((item: Expense) => item.title.includes(query))

    const notifySuccess = () => toast.success('Expense Deleted!')

    const [myquery, setQuery] = React.useState<string>('')
    const dispatch = useDispatch()

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuery(e.target.value)
        dispatch(searchExpense(e.target.value))
    }
    return (
        <div className="expense-list">
            <ToastContainer
                position="bottom-left"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
            />
            <div className="topfold">
                <div className="home-topfold">
                    <div className="searchbar">
                        <i className="fi-rr-search"></i>
                        <input
                            placeholder="Search for expenses"
                            value={myquery}
                            onChange={(e) => handleQuery(e)}
                        />
                    </div>
                </div>
            </div>
            {filteredList.length
                ? filteredList.map((item, index) =>
                    <Card key={index} item={item} notifySuccess={notifySuccess} />
                )
                : <div className="empty-state">
                    <label>Oh! Your expense list is empty.</label>
                </div>
            }
        </div>
    )
}

export default ExpenseList
