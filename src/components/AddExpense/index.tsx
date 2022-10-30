/* eslint-disable global-require */
import React, {
    Dispatch, SetStateAction, useState
} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './style.css'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addExpense } from '../../redux/actions'
import SuccessModal from '../SuccessModal'

interface MyProps {
    setActiveTab: Dispatch<SetStateAction<string>>
}

const AddExpense = (props: MyProps) => {
    interface category {
        id: number;
        title: string;
        icon: string;
        color: string;
    }

    const categories = [
        {
            id: 1,
            title: 'Education',
            icon: require('../../assets/images/education.png'),
            color: '#A95EC2'
        },
        {
            id: 2,
            title: 'Healthcare',
            icon: require('../../assets/images/healthcare.png'),
            color: '#FF768A'
        },
        {
            id: 3,
            title: 'Shopping',
            icon: require('../../assets/images/shopping.png'),
            color: '#EC60AB'
        },
        {
            id: 4,
            title: 'Food',
            icon: require('../../assets/images/food.png'),
            color: '#FF9E6D'
        },
        {
            id: 5,
            title: 'Other',
            icon: require('../../assets/images/entertainment.png'),
            color: '#FFCB5E'
        }
    ]
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState<category>()
    const dispatch = useDispatch()

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value)
        if (isNaN(val)) {
            setAmount('')
            return
        }
        setAmount(String(val))
    }
    const handleCategory = (category: category) => {
        setCategory(category)
        setCategoryOpen(false)
    }

    const handleSubmit = () => {
        if (title === '' || amount === '' || !category) {
            const notify = () => toast('Please enter complete data')
            notify()
            return
        }
        const data = {
            title,
            amount,
            category,
            createdAt: new Date()
        }
        dispatch(addExpense(data))
        setOpen(!isOpen)
    }

    return (
        <div className="add-form">
            <SuccessModal modalOpen={isOpen} handleClick={setOpen} setActiveTab={props.setActiveTab} />
            <ToastContainer
                position="bottom-left"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
            />
            <div className="form-item">
                <label>Title</label>
                <input
                    placeholder="Give a name to your expenditure"
                    value={title}
                    onChange={(e) => handleTitle(e)}
                />
            </div>
            <div className="form-item">
                <label>Amount ₹</label>
                <input
                    placeholder="Enter Amount"
                    className="amount-input"
                    onChange={(e) => handleAmount(e)}
                    value={amount}
                />
            </div>
            <div className="category-container-parent">
                <div className="category">
                    <div
                        className="category-dropdown"
                        onClick={() => setCategoryOpen(!categoryOpen)}
                    >
                        <label>{category ? category.title : 'Category'}</label>
                        {categoryOpen ? <i className="fi-rr-angle-up"></i> : <i className="fi-rr-angle-down"></i>}
                    </div>
                    {categoryOpen &&
                        <div className="category-container">
                            {categories.map((category) =>
                                <div
                                    className="category-item"
                                    style={{ borderRight: `5px solid ${category.color}` }}
                                    key={category.id}
                                    onClick={() => handleCategory(category)}
                                >
                                    <label>{category.title}</label>
                                    <img src={category.icon} alt={category.title} />
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
            <div className="form-add-button">
                <div onClick={handleSubmit}>
                    <label>Add</label>
                    <i className="fi-rr-paper-plane"></i>
                </div>
            </div>
        </div>
    )
}

export default AddExpense
