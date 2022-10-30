import {
    ADD_EXPENSE,
    DELETE_EXPENSE,
    SEARCH_EXPENSE
} from '../action-types/constant'

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

interface ExpenseAction {
    type: string;
    data: Expense;
    query: string;
}

const initialList = () => {
    const list = localStorage.getItem('expense-list')
    let expenses = []
    if (list) {
        expenses = JSON.parse(list)
    }
    return expenses
}
const initialState = { expenseList: initialList(), query: '' }

export const expenseReducer = (state = initialState, action: ExpenseAction) => {
    switch (action.type) {
        case ADD_EXPENSE: {
            localStorage.setItem(
                'expense-list',
                JSON.stringify([...state.expenseList, action.data])
            )
            return {
                ...state,
                expenseList: [...state.expenseList, action.data],
                query: ''
            }
        }
        case DELETE_EXPENSE: {
            const { data } = action
            const updatedList = state.expenseList.filter(
                (item: Expense) => item.createdAt !== data.createdAt
            )
            localStorage.setItem('expense-list', JSON.stringify(updatedList))
            return { ...state, expenseList: updatedList }
        }
        case SEARCH_EXPENSE: {
            const { query } = action
            return { ...state, query }
        }
        default:
            return { ...state }
    }
}
