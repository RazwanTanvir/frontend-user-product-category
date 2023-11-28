import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    userId: '',
    productName: '',
    description: '',
    categoryIds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { options } = e.target;
    const selectedCategories = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData((prevData) => ({ ...prevData, categoryIds: selectedCategories }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/products/create', formData);
      console.log('Product added:', response.data);
      // Reset the form data after successful submission
      setFormData({
        userId: '',
        productName: '',
        description: '',
        categoryIds: [],
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="text" name="userId" value={formData.userId} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Product Name:
          <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Categories (select multiple):
          <select multiple name="categoryIds" value={formData.categoryIds} onChange={handleCategoryChange}
          style={{ width: '20%', padding: '8px', borderRadius: '4px' }}
          >
            {/* Assume you have a list of categories available */}
            <option value="">--Select--</option>
            <option value="1">Electronics</option>
            <option value="2">Food</option>
            <option value="3">AutoZone</option>
            {/* Add more options as needed */}
          </select>
          {/* {formData.categoryIds.length > 0 && (
        <div>
          <h6>Selected Category IDs:</h6>
          <ul>
            {formData.categoryIds.map((categoryId) => (
              <li key={categoryId}>{categoryId}</li>
            ))}
          </ul>
        </div>
      )} */}
        </label>
        <br />
        
        <button type="submit">Add Product</button>
      </form>

      
    </div>
  );
};

export default AddProduct;
