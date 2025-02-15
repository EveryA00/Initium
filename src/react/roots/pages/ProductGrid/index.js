import React from "react";
import { Styled } from './styledComponents'
import ProductCard from "../ProductCard";


const ProductGrid = ({products}) => {
  
  return (
    <Styled.GridContainer>
      {products.map((product) => (
        <ProductCard key={product.id}  product={product} /> 
      ))}
    </Styled.GridContainer>
  );
};

export default ProductGrid;
