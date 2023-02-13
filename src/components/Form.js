import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, createTransaction, editInActive } from '../features/transaction/transactionSlice';

const Form = () => {

    const { transactions, editing } = useSelector(state => state.transaction)
    const { isLoading, isError, error } = transactions


    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')

    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const reset = () => {
        setName('')
        setType('')
        setAmount('')
    }


    useEffect(() => {
        console.log(editing)

        if (editing?.id) {
            const { name, type, amount } = editing
            setName(name)
            setType(type)
            setAmount(amount)
            setEditMode(true)
        }
        else {
            reset()
            setEditMode(false)
        }

    }, [editing])











    const handleCreate = (e) => {
        e.preventDefault()


        dispatch(createTransaction({
            name,
            type,
            amount: Number(amount)
        }))

        reset()


    }

    const handleCancelEditMode = () => {


        dispatch(editInActive())
        setEditMode(false)
        console.log(editMode)
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        dispatch(changeTransaction({
            id: editing?.id,
            data: {
                name,
                type,
                amount: Number(amount)
            }

        }))
        reset()
        setEditMode(false)




    }




    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate} >

                <div className="form-group">
                    <label >Name</label>
                    <input
                        required
                        type="text"
                        name="transaction_name"
                        placeholder="My Salary"
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                    />
                </div>

                <div className="form-group radio">
                    <label >Type</label>
                    <div className="radio_group">
                        <input
                            required

                            type="radio"
                            value={type}
                            name="transaction_type"

                            onChange={(e) => setType('income')}
                            checked={type === 'income'}

                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value={type}
                            name="transaction_type"
                            placeholder="Expense"
                            onChange={(e) => setType('expense')}
                            checked={type === 'expense'}
                        />
                        <label >Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label >Amount</label>
                    <input
                        required
                        type="number"
                        placeholder="300"
                        name="transaction_amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn" type='submit' >
                    {editMode ? 'updateTransaction' : 'add Transaction'}</button>
                {!isLoading && isError && <p className='error'>{error}</p>}



            </form>

            {
                editMode && <button onClick={handleCancelEditMode} className="btn cancel_edit">Cancel Edit</button>
            }




        </div>
    );
};

export default Form;