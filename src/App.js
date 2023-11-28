// App.js

import React from 'react';
import Register from './views/Register';
import Login from './views/Login';
import FileUpload from './views/FileUpload';
import ProductListByCategory from './views/ProductListByCategory';
import AddProduct from './views/AddProduct';


const App = () => {
  return (
    <div>
      <Register />
      <hr />
      <Login />
      <hr/>
      <FileUpload />
      <hr/>
      <ProductListByCategory />
      <hr/> 
      <AddProduct />
    </div>
  );
};

export default App;
