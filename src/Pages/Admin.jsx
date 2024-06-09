import React from 'react'


import './Admin.css'

import Sidebar from '../Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Orders from '../Components/Orders/Orders'
import AddProduct from '../Components/AddProduct/AddProduct'
import UpdateProduct from '../Components/UpdateProduct/UpdateProduct'
import ProductList from '../Components/ProductList/ProductList'
import UserList from '../Components/UserList/UserList'


const Product = () => {
  return (
    <div className='admin'>
      <Sidebar/>

      <Routes>
        <Route path='/' element={<Orders/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/productlist' element={<ProductList/>}/>
        <Route path='/userlist' element={<UserList/>}/>
        <Route path='/updateproduct' element={<UpdateProduct/>}>  
           <Route path=':productId' element={<UpdateProduct/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default Product