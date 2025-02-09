import React from "react";
import { Styled } from './styledComponents'
import ProductCard from "../ProductCard";

// Sample product data
const products = [
  { id: 'pomegranate-juice', name: "Pomegranate Juice", image: "", price: "$5.99" },
  { id: 'orange-juice', name: "Orange Juice", image: "", price: "$4.99" },
  { id: 'apple-juice', name: "Apple Juice", image: "", price: "$3.99" },
  { id: 'grape-juice', name: "Grape Juice", image: "", price: "$6.99" }
];

const ProductGrid = () => {
  return (
    <Styled.GridContainer>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} /> 
      ))}
    </Styled.GridContainer>
  );
};

export default ProductGrid;
