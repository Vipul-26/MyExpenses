import React from 'react'
import './App.css'
import AddExpense from './components/AddExpense/index'
import MyExpenses from './components/MyExpenses'

const App = () => {
    const [activeTab, setActiveTab] = React.useState('tab1')

    const handleTab1 = () => {
        setActiveTab('tab1')
    }
    const handleTab2 = () => {
        setActiveTab('tab2')
    }
    return (
        <div className="container">
            <div className="header-container">
                <div className="header">
                    <div className="header-logo">
                      My Expenses <i className="fi-rr-credit-card" />
                    </div>
                </div>
            </div>
            <ul className="nav">
                <li className={activeTab === 'tab1' ? 'active' : ''} onClick={handleTab1}>
                  MyExpenses
                </li>
                <li className={activeTab === 'tab2' ? 'active' : ''} onClick={handleTab2}>
                  AddExpense
                </li>
            </ul>
            <div className="outlet">
                {activeTab === 'tab1' ? <MyExpenses /> : <AddExpense setActiveTab={setActiveTab} />}
            </div>
        </div>
    )
}

export default App
