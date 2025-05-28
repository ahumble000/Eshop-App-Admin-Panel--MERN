import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socketService } from '../../services/socket';
import './Order.css'

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/users/orders');
        const data = await res.json();
        setOrders(data);
      } catch (e) {
        console.log('Error in fetching the data: ', e.message);
      }
    };

    const fetchProducts = async () =>{
      try {
        const res = await fetch('http://localhost:4000/api/products');
        const data = await res.json();
        setAllProducts(data);
      } catch (e) {
        console.log('Error in fetching the data: ', e.message);
      }
    }

    fetchOrders();
    fetchProducts();

    // Setup socket listeners for real-time updates
    socketService.onNewOrder((newOrder) => {
      setOrders(prev => [...prev, newOrder]);
    });

    socketService.onOrderRemoved((data) => {
      setOrders(prev => 
        prev.filter(order => order._id !== data.id)
      );
    });

    // Cleanup listeners on unmount
    return () => {
      socketService.removeAllListeners();
    };
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/users/orders/${orderId}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        // No need to manually update state, socket will handle it
        console.log('Order deleted successfully');
      } else {
        console.log('Error in deleting the order: ', result.message);
      }
    } catch (e) {
      console.log('Error in deleting the order: ', e.message);
    }
  };

  return (
    <div className="product-list">
      <div className="order-list-headings product-list-headings">
        <h4>Username</h4>
        <h4>User Email</h4>
        <h4>Items Name</h4>
        <h4>Total Price</h4>
        <h4>Date</h4>
        <h4>Cancel Order</h4>
      </div>

      {orders.map((order, i) => (
        <div key={i} className="order-list-items product-list-item">
          <h4>{order.user.name}</h4>
          <h4>{order.user.email}</h4>
          <div>
            {allProducts.map((item, j) => {
              if (order.items[item.id] > 0) {
                return <p className='item-name' key={j}>{item.name}</p>;
              }
              return null;
            })}
          </div>
          <p>${order.total}</p>
          <p>{new Date(order.date).toLocaleDateString()}</p>
          <button onClick={()=> handleDeleteOrder(order._id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
};

export default Order;