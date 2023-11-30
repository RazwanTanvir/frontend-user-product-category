import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    userId: '',
    productName: '',
    description: '',
    categoryIds: [],
  });

  const categoriesMap = new Map([
    [1, '1'],
    [2, '2'],
    [3, '3'],
  ]);

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
    <div style={{marginLeft:'20px'}}>
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
        <label>Select Category:</label>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select...</option>
        {[...categoriesMap].map(([categoryId, categoryName]) => (
          <option key={categoryId} value={categoryId}>
            {categoryName}
          </option>
        ))}
      </select>
        <br />

        <button type="submit">Add Product</button>
      </form>

      
    </div>
  );
};

export default AddProduct;
