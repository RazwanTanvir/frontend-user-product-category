import React, { useState } from 'react';
import ProductList from './ProductList'; // Adjust the path as needed

const ProductListByCategory = () => {
  const [categoryId, setCategoryId] = useState('');
  const [submittedCategoryId, setSubmittedCategoryId] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedCategoryId(categoryId);
  };
  
  return (
    <div>

<div style={{marginLeft:'20px'}}>
      <h2>Product List by Category</h2>
      
      {/* <form onSubmit={handleSubmit}>
        <label>
          Enter Category ID:
          <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
        </label>
        <button type="submit">Fetch Products</button>
      </form> */}
      <ProductList />

      {/* {submittedCategoryId && <ProductList categoryId={submittedCategoryId} />} */}
    </div>

      {/* <h2>Product List by Category</h2> */}
      {/* <ProductList categoryId={categoryId} /> */}
    </div>
  );
};

export default ProductListByCategory;
