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

export const addExpense = (data: Expense) => ({ type: ADD_EXPENSE,
    data })

export const deleteExpense = (data: Expense) => ({ type: DELETE_EXPENSE,
    data })

export const searchExpense = (query: string) => ({ type: SEARCH_EXPENSE,
    query })
