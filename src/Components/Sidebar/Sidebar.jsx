import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  // const [userRole, setUserRole] = useState(null);

  // const fetchUserRole = async () => {
  //   try {
  //     const response = await fetch('http://localhost:4000/api/users/me', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'auth_token': localStorage.getItem('auth_token') || ''
  //       },
  //       credentials: 'include'
  //     });
  //     if (response.ok) {
  //       const user = await response.json();
  //       setUserRole(user.role);
  //     } else {
  //       console.error('Failed to fetch user role', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch user role', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserRole();
  // }, []);

  const handleHomeClick = () => {
    window.location.href = 'http://localhost:3000/';
  };

  return (
    <div className='sidebar'>
      <div className="cross"></div>
      <ul>
        <li><a href='#' onClick={handleHomeClick}>Home</a></li>
        <li><NavLink to={'/'}>Order</NavLink></li>
        <li><NavLink to={'/productlist'}>Product List</NavLink></li>
        <li><NavLink to={'/addproduct'}>Add Product</NavLink></li>
        {/* {userRole === 'admin' && ( */}
          <li><NavLink to={'/userlist'}>User List</NavLink></li>
        {/* )} */}
        <li><NavLink to={'/messages'}>Messages</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
