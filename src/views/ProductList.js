import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/categories`);
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleSearch = (term) => {
    if (term !== '') {
        setSearchTerm(term);
        const filteredProducts = products.filter((product) =>
          // Customize the condition based on your search requirements
          product.categoryIds.toLowerCase().includes(term.toLowerCase())
        );
        setProducts(filteredProducts);
    } else {
        setProducts(products);
        setSearchTerm('');
    }

    
  };

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <label>Search by Product Category: </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '60%', marginLeft: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>CategoryIDs</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.productId}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.productName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.categoryIds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
