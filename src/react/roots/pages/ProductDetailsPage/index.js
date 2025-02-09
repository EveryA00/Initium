import React from 'react';
import { useParams } from 'react-router-dom';

// Sample product data (you could fetch this from an API or pass via context)
const products = [
    { id: 'pomegranate-juice', name: "Pomegranate Juice", image: "", price: "$5.99" },
    { id: 'orange-juice', name: "Orange Juice", image: "", price: "$4.99" },
    { id: 'apple-juice', name: "Apple Juice", image: "", price: "$3.99" },
    { id: 'grape-juice', name: "Grape Juice", image: "", price: "$6.99" }
  ];

const ProductDetail = () => {
  const { productId } = useParams();  // Access the productId from the URL
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <div>
      <h2>{product?.name}</h2>
      <img src={product?.image || 'https://via.placeholder.com/150'} alt={product?.name} />
      <p>{product?.description}</p>
      <p>{product?.price}</p>
    </div>
  );
};

export default ProductDetail;
