import React from 'react'
import './style.css'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deleteExpense } from '../../redux/actions'

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

interface CardProps {
    item: Expense;
    notifySuccess: () => void;
}

const Card = (props: CardProps) => {
    const time = moment(props.item.createdAt).fromNow()
    const dispatch = useDispatch()
    const handleDelete = () => {
        props.notifySuccess()
        dispatch(deleteExpense(props.item))
    }

    return (
        <div
            className="card"
            style={{ borderRight: `6px solid ${props.item.category.color}` }}
        >
            <div className="card-image-container">
                <img
                    src={props.item.category.icon}
                    alt={props.item.category.title}
                    className="card-image"
                />
            </div>
            <div className="card-info">
                <label className="card-title">{props.item.title}</label>
                <label className="card-time">{time}</label>
            </div>
            <div className="card-right">
                <div>
                    <label className="card-amount">₹ {props.item.amount}</label>
                </div>
                <div className="delete-icon" onClick={handleDelete}>
                    <i className="fi-rr-trash"></i>
                </div>
            </div>
        </div>
    )
}

export default Card
