import React, {useContext} from "react";
import { Styled } from './styledComponents'
import ProductCard from "../ProductCard";
import { ProductsContext } from '../../../../context/ProductsContext';

const ProductGrid = ({cart, setCart}) => {
  const { products } = useContext(ProductsContext); // Access products from context
  return (
    <Styled.GridContainer>
      {products.map((product) => (
        <ProductCard key={product.id}  product={product} cart={cart} setCart={setCart} /> 
      ))}
    </Styled.GridContainer>
  );
};

export default ProductGrid;
