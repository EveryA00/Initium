import React from "react";
import { Styled } from './styledComponents';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

  return (
    <Styled.Card>
      <Styled.Img src={product?.image} alt={product?.name} />
      <h3>{product?.name}</h3>
      <p>{product?.price}</p>
      <Styled.Link as={Link} to={`/product/${product?.id}`}>
        <Styled.Button>View Details</Styled.Button>
      </Styled.Link>
    </Styled.Card>
  );
};

export default ProductCard;
