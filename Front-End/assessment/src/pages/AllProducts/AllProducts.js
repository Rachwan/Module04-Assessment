import {React, useState, useEffect} from 'react';
import style from './AllProducts.module.css';
import axios from "axios";

function AllProducts() {
  const [allProductsData, setAllProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/products/all`
        );
        const data = response.data;
        console.log(data)
        setAllProductsData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className={style.main}>
      <h1 className={style.heading}>All Products</h1>
      <div className={style.cardContainer}>
        {allProductsData.map((product) => (
          <div key={product.id} className={style.card}>
            <h2>{product.title}</h2>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Supplier: {product.supplier}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default AllProducts;