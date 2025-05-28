import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { socketService } from '../../services/socket';
import './ProductList.css';

const ProductList = () => {
   
    const navigation = useNavigate();

    const [all_product,setAllProductDetails] = useState([]);
    const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredProducts = all_product.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

    const fetchInfo = async () =>{
        await fetch(`http://localhost:4000/api/products`)
        .then((res)=> res.json())
        .then((data)=>setAllProductDetails(data))
        .catch((e)=> console.log("Error in fetching the data : " , e.message))
    };

    useEffect(()=>{
        fetchInfo();

        // Setup socket listeners for real-time updates
        socketService.onNewProduct((newProduct) => {
          setAllProductDetails(prev => [...prev, newProduct]);
        });

        socketService.onProductChange((updatedProduct) => {
          setAllProductDetails(prev => 
            prev.map(product => 
              product.id === updatedProduct.id ? updatedProduct : product
            )
          );
        });

        socketService.onProductRemoved((data) => {
          setAllProductDetails(prev => 
            prev.filter(product => product.id !== data.id)
          );
        });

        // Cleanup listeners on unmount
        return () => {
          socketService.removeAllListeners();
        };
    },[]);


    const removeProduct = async (productId)=>{
        const response = await fetch (`http://localhost:4000/api/products`,{
            method : 'DELETE',
            headers : {
                Accept : 'application/json',
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({id:productId})
        });

        // No need to call fetchInfo() anymore as socket will handle the update
    }

    return (
        <div className="product-list">

<input
        type="text"
        placeholder="Search here..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />

            <div className="product-list-headings">
                <h4>Image</h4>
                <h4>Name</h4>
                <h4>New Price</h4>
                <h4>Old Price</h4>
                <h4>Category</h4>
                <h4>Update</h4>
                <h4>Remove</h4>
            </div>

            {filteredProducts.slice().reverse().map((item,i) => (
                <div key={i} className="product-list-item">
                    <img src={item.image} alt="Item Image" />
                    <h4>{item.name}</h4>
                    <p>${item.new_price}</p>
                    <p>${item.old_price}</p>
                    <p>{item.category}</p>
                    <button onClick={()=> navigation(`/updateproduct/${item.id}`)}>Update</button>
                    <button onClick={()=> removeProduct(item.id)}>Remove</button>
                </div>
            ))}
        
        </div>
    );
};

export default ProductList;