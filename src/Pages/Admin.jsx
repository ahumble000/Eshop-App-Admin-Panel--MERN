import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';


import './Admin.css'

import Sidebar from '../Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../Components/AddProduct/AddProduct'
import UpdateProduct from '../Components/UpdateProduct/UpdateProduct'
import ProductList from '../Components/ProductList/ProductList'
import UserList from '../Components/UserList/UserList'
import UpdateUser from '../Components/UpdateUser/UpdateUser'
import Order from '../Components/Order/Order';
import MessageList from '../Components/MessageList/MessageList';


const Product = () => {

  const [sideOpen, setSideOpen] = useState(false)

  const sideHandler = () =>{
    setSideOpen(!sideOpen);
  }

  return (
    <div className='admin'>

      <div className="hamicon" onClick={sideHandler}>
        {sideOpen ?  <FaBars/> : <FaTimes/> }
      </div>
      
      <div className= {sideOpen ? "sidebar-none" : "sidebar-block" }>
        <Sidebar/>
      </div>

      <Routes>
        <Route path='/' element={<Order/>}/>
        <Route path='/productlist' element={<ProductList/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/userlist' element={<UserList/>}/>
        <Route path='/messages' element={<MessageList/>}/>
        <Route path='/updateuser/:id' element={<UpdateUser />} />
        <Route path='/updateproduct' element={<UpdateProduct/>}>  
           <Route path=':productId' element={<UpdateProduct/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default Product