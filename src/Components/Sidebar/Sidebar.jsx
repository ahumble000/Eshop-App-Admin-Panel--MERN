import React from 'react'
import {NavLink} from 'react-router-dom'

import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="cross"></div>
        <ul>
            <li><NavLink to={'/'}>Orders</NavLink></li>
            <li><NavLink to={'/addproduct'}>Add Product</NavLink></li>
            <li><NavLink to={'/productlist'}>Product List</NavLink></li>
            <li><NavLink to={'/userlist'}>User List</NavLink></li>
        </ul>
    </div>                     
  )
}

export default Sidebar