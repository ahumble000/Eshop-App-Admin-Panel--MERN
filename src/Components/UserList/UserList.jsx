import React, { useState, useEffect } from 'react';
import './UserList.css';

const UserList = () => {
  const [userList, setUserList] = useState([]);

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
        await fetchInfo();
      } else {
        console.error('Failed to delete user');
      }
    } catch (e) {
      console.error('Error in deleting user', e);
    }
  };

  return (
    <div className="product-list">
      <div className="product-list-headings">
        <h4>Name</h4>
        <h4>Email</h4>
        <h4>Password</h4>
      </div>

      {userList.slice().reverse().map((item, i) => (
        <div key={i} className="product-list-item">
          <p>{item.name}</p>
          <p>{item.email}</p>
          <button onClick={() => removeUser(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
