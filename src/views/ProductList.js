import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [storedProducts, setStoredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('productId');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/categories`);
        setProducts(response.data);
        setStoredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredProducts = storedProducts.filter((product) =>
      // Customize the condition based on your search requirements
      product.categoryIds.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      setProducts(storedProducts);
      setSearchTerm('');
    } else {
      setProducts(filteredProducts);
      setSearchTerm(term);
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const sortOrderFactor = sortOrder === 'asc' ? 1 : -1;
    return sortOrderFactor * (a[sortColumn] - b[sortColumn]);
  });

  const getSortIndicator = (column) => {
    if (column === sortColumn) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  return (
    <div style={{ marginLeft: '20px' }}>
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
              <th style={{ border: '1px solid #ddd', padding: '8px', cursor: 'pointer' }} onClick={() => handleSort('productId')}>
                Product ID {getSortIndicator('productId')}
              </th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }} onClick={() => handleSort('productName')}>
                Product Name
              </th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }} onClick={() => handleSort('description')}>
                Description
              </th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }} onClick={() => handleSort('categoryIds')}>
                Category IDs
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
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
