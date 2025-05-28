import React, { useState } from 'react'
import upload_area from '../../Assets/upload_area.png'

import './AddProduct.css'

const AddProduct = () => {

  const [image, setImage] = useState(null);
  
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  const addProduct = async (event) => {

    event.preventDefault();
    
    if (!productDetails.name || !productDetails.category || !productDetails.new_price || !productDetails.old_price || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }
  
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(productDetails.new_price) || !priceRegex.test(productDetails.old_price)) {
      alert("Please enter valid price values (numbers only).");
      return;
    }
    
    try {
      let formData = new FormData();
      formData.append('product', image);

      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const responseData = await response.json();

      if (responseData.success) {
        const updatedProductDetails = { ...productDetails, image: responseData.image_url };
        console.log(updatedProductDetails);

        await fetch('http://localhost:4000/api/products' , {
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
          },
          body:JSON.stringify(updatedProductDetails),
        })
        .then((response)=> response.json())
        .then((data)=>{
          data.success?alert("Product added successfully"):alert("Failed to add product!");
        })

      } 
      
      else {
        throw new Error('Failed to upload image');
      }
    }
    
    catch (error) {
      console.error("Product creation error ", error);
    }
  }


  return (
    <div className='addproduct'>
       <h2>Create a New Product</h2>
      <form  onSubmit={addProduct}>

        <div className="form-side1">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name='name' value={productDetails.name}  onChange={changeHandler} required/>
          </div>
          <div className="form-group">
            <label>Old Price:</label>
            <input type="text" name='old_price' value={productDetails.old_price} onChange={changeHandler} required/>
          </div>
          <div className="form-group">
            <label>New Price:</label>
            <input type="text" name='new_price' value={productDetails.new_price} onChange={changeHandler} required/>
          </div>
        </div>

        <div className="form-side2">
          <div className="form-group">
            <label>Product Category:</label>
            <select name='category' value={productDetails.category} onChange={changeHandler} required>
              <option value="">Select category</option>
              <option value="herbal">Herbal</option>
              <option value="protein">Protein</option>
              <option value="multivitamins">Multivitamins</option>
              <option value="probiotics">Probiotics</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor='upload-area' className='upload-area'>
              <img src={image?URL.createObjectURL(image):upload_area} alt="upload area image" />
            </label>
            <input onChange={imageHandler} type="file" id='upload-area' hidden required/>
          </div>
          <button>Create Product</button>
        </div>
        
      </form>
    </div>
  )
}

export default AddProduct