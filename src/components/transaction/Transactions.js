import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import './CreateTransaction.css';

const Transactions = () => {
  const { user , logoutUpdate } = useAuth();
  const navigate = useNavigate();

  if(!user){
    logoutUpdate();
  }

  const [transaction, setTransaction] = useState([]); 


  useEffect(() => {
     axios.get('http://54.236.236.189:3000/trans/get', {
          headers: {
            'x-auth-token': user.token,
          },
        }).then((res) =>  setTransaction(res.data))
        .catch((err) => {
          toast.error('Failed to fetch Transactions. Please try again.');
          navigate('/')
        })
  },[]);

  const calculateTotalAmount = () => {
    return transaction.reduce((total, trans) => total + parseFloat(trans.amount), 0).toFixed(2);
  };

  const deleteTransaction = (id) => {
    return async () =>{
      axios.delete(`http://54.236.236.189:3000/trans/delete/${id}`, {
          headers: {
            'x-auth-token': user.token,
          },
        }).then((res) =>  {toast.success('Deleted Successfully') 
        
        const output = transaction.filter((trans) =>
          trans._id !== id
        )
        setTransaction(output);
      })
        .catch((err) => {
          toast.error('Failed to Delete. Please try again.');
        })
    }
  }

  return (
    <div className="trans-list-page-container">
      <div className="header-container">
        <h2>Transaction's List</h2>
        <div className="d-flex justify-content-first" id="navbarNav">
        <div className="d-flex total-amount me-4 mb-4"> 
        <Link to="/create" className="nav-link mf-6"><button className="btn my-buttons">Create</button></Link>
        </div>
        </div>
        <div className="d-flex justify-content-end" id="navbarNav">
        <div className="d-flex total-amount me-4 mb-4"> 
            Total Amount: ${calculateTotalAmount()}
        </div>
        </div>
        
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Transaction Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map(trans => (
            <tr key={trans._id}>
              <td>{trans._id}</td>
              <td>{trans.description}</td>
              <td>${parseFloat(trans.amount).toFixed(2)}</td>
              <td>{trans.completed ? 'Completed' : 'Not Completed'}</td>
              <td>{trans.transactionType}</td>
              <td><button className='btn btn-danger' onClick={deleteTransaction(trans._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;