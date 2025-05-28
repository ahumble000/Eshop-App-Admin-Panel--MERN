import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socketService } from '../../services/socket';
import './UserList.css';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/users');
      const data = await res.json();
      setUserList(data);
    } catch (e) {
      console.error('Error in fetching user data', e);
    }
  };

  useEffect(() => {
    fetchInfo();

    // Setup socket listeners for real-time updates
    socketService.onUserRemoved((data) => {
      setUserList(prev => 
        prev.filter(user => user._id !== data.id)
      );
    });

    // Cleanup listeners on unmount
    return () => {
      socketService.removeAllListeners();
    };
  }, []);

  const removeUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // No need to call fetchInfo() anymore as socket will handle the update
        console.log('User deleted successfully');
      } else {
        console.error('Failed to delete user');
      }
    } catch (e) {
      console.error('Error in deleting user', e);
    }
  };

  return (
    <div className="product-list">
      <div className="user-list-headings product-list-headings">
        <h4>Name</h4>
        <h4>Email</h4>
        <h4>Role</h4>
        <h4>Update</h4>
        <h4>Remove</h4>
      </div>

      {userList.slice().reverse().map((item, i) => (
        <div key={i} className="user-list-item product-list-item">
          <p>{item.name}</p>
          <p>{item.email}</p>
          <p>{item.role}</p>
          <button onClick={() => navigate(`/updateuser/${item._id}`)}>Update</button>
          <button onClick={() => removeUser(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;