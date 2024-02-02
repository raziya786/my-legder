import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';
import './CreateTransaction.css'

const CreateTransaction = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

  const [transaction, setTransaction] = useState({ description : '' , amount : '' , transactionType: 'credited' , completed: false});

  const onChange = e =>
  setTransaction({ ...transaction, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://54.236.236.189:3000/trans/create',
        transaction,
        {
          headers: {
            'x-auth-token': user.token,
          },
        }
      );

      toast.success('Transaction created successfully!');
      navigate('/transaction')


    } catch (error) {
      toast.error('Failed to create Transaction. Please try again.');
    }
  };

  return (
    <div className="create-task-page-container">
      <h2>Add Transaction</h2>
      <form className="create-task-form" onSubmit={onSubmit}>
        <label>Task Description:</label>
        <textarea
          rows="4"
          value={transaction.description}
          name='description'
          onChange={onChange}
          placeholder="Enter transaction description"
          required
        />

        <label>Amount:</label>
        <input
          type='text'
          name='amount'
          value = {transaction.amount}
          onChange={onChange}
          required
          placeholder="Enter Amount"
        />

        <label>Status:</label>
        <select
          value={transaction.completed}
          name='completed'
          onChange={onChange}
          required
        >
          <option value={false}>Not Completed</option>
          <option value={true}>Completed</option>
        </select>

        <label>Transaction Type:</label>
        <select
          value={transaction.transactionType}
          onChange={onChange}
          name='transactionType'
          required

        >
          <option value="credited">Credited</option>
          <option value="debited">Debited</option>
        </select>


        <button type="submit">Create Transaction</button>
      </form>
    </div>
  );
};

export default CreateTransaction;