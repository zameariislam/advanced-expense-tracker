import React from 'react';
import editImage from '../../assets/images/edit.svg'
import deleteImage from '../../assets/images/delete.svg'
import { useDispatch } from 'react-redux';
import { editActive, removeTransaction } from '../../features/transaction/transactionSlice';

const Transaction = ({ transaction }) => {

    const dispatch = useDispatch()
    const { id, name, type, amount } = transaction

    const handleDelete = (id) => {
        dispatch(removeTransaction(id))

    }

    const handleEdit = (id) => {
        dispatch(editActive(transaction))




    }

    return (
        <li className={`transaction income ${type} `}>
            <p>{name}</p>
            <div className="right">
                <p>{amount}</p>
                <button className="link">
                    <img
                        onClick={() => handleEdit(id)}
                        className="icon"
                        src={editImage}
                        alt='edit'
                    />
                </button>
                <button className="link">
                    <img
                        onClick={() => handleDelete(id)}
                        className="icon"
                        src={deleteImage}
                        alt='delete'
                    />
                </button>
            </div>
        </li>
    );
};

export default Transaction;