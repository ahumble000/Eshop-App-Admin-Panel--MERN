import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// import upload_area from '../Assets/upload_area.png'
import '../AddProduct/AddProduct.css'

const UpdateProduct = () => {
  
  const {productId} = useParams();
  const [updateDetails,setUpdateDetails] = useState([]);
  const [productDetails, setProductDetails] = useState({
    id: '',
    name: '',
    category: '',
    new_price: '',
    old_price: '',
    image: '',
  });
  const [image,setImage] = useState(null);
  
  
  useEffect(()=>{
    const fetchInfo = async ()=>{
      await fetch(`http://localhost:4000/api/products`)
      .then((res)=>res.json())
      .then((data)=>setUpdateDetails(data))
      .catch((e)=>alert('Error in fetching info ',e.message))
    }  
    fetchInfo()
  },[productId]);

  const productDetail = updateDetails[productId - 1];

 
  useEffect(() => {
    if (productDetail) {
      setProductDetails({
        id: productId,
        name: productDetail.name || '',
        category: productDetail.category || '',
        new_price: productDetail.new_price || '',
        old_price: productDetail.old_price || '',
        image: productDetail.image || '',
      });
    }
  }, [productDetail, productId]);
  

  const imageHandler = (e) =>{
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) =>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value});
  }

  const updateproduct = async (event) =>{

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

    let formData = new FormData();
    formData.append('product',image);

    const response = await fetch('http://localhost:4000/upload',{
      method:'POST',
      body:formData,
    })

    const responseData = await response.json();

    const updateProductDetails = { ...productDetails, id: productId, image: responseData.image_url };

    await fetch('http://localhost:4000/api/products',{
      method:'PATCH',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(updateProductDetails),
    })
    .then((res)=>res.json())
    .then((data)=>{
      data.success?alert("Product has been updated sucessfully"):alert("Failed to update product");
    })

  } 


  return (
    <div className='addproduct'>
       <h2>Update Product</h2>
        <form onSubmit={updateproduct}>

          <div className="form-side1">
            <div className="form-group">
              <label>Updated Name:</label>
              <input type="text" name='name' value={productDetails.name}  onChange={changeHandler} required/>
            </div>
            <div className="form-group">
              <label>Updated Old Price:</label>
              <input type="text" name='old_price' value={productDetails.old_price} onChange={changeHandler} required/>
            </div>
            <div className="form-group">
              <label>Updated New Price:</label>
              <input type="text" name='new_price' value={productDetails.new_price} onChange={changeHandler} required/>
            </div>
          </div>

          <div className="form-side2">
            <div className="form-group">
              <label>Updated Product Category:</label>
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
                {/* <img src={image?URL.createObjectURL(image):upload_area} alt="upload area image" /> */}
                <img src={image?URL.createObjectURL(image):productDetails.image} alt="upload area image" />
              </label>
              <input onChange={imageHandler} type="file" id='upload-area' hidden required/>
            </div>
            <button>Update Product</button>
          </div>

        </form>
    </div>
  )
}

export default UpdateProduct