import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [userRole, setUserRole] = useState('');

  const [allProductsData, setAllProductsData] = useState([]);

  const [newProductData, setNewProductData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    supplier: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/products/all`);
      setAllProductsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND}/products/create`, newProductData);
      fetchProducts();
      setNewProductData({
        title: '',
        category: '',
        description: '',
        price: '',
        supplier: '',
      });
    } catch (error) {
      console.log(error)
    }
  };

  const handleUpdateProduct = async (productId, updatedProductData) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND}/products/update/${productId}`, updatedProductData);
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND}/products/delete/${productId}`);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <h1>Product Dashboard</h1>

      {userRole === 'product_creator' && (
        <div>
          <h2>Add Product</h2>
          <input
            type="text"
            placeholder="Category"
            value={newProductData.category}
            onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="description"
            value={newProductData.description}
            onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="price"
            value={newProductData.price}
            onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="supplier"
            value={newProductData.supplier}
            onChange={(e) => setNewProductData({ ...newProductData, supplier: e.target.value })}
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      )}
      </div>
  );
}

export default Dashboard;
