import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import { Styled } from './styledComponents';
import { ProductsContext } from '../../../../context/ProductsContext';

const ProductDetail = () => {
  const { products } = useContext(ProductsContext); // Access products from context
  const { productId } = useParams();  // Access the productId from the URL
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <Styled.ProductDetailCard>
      <Styled.ProductSectionLeft>
        <Styled.Img src={product?.secondImage || 'https://via.placeholder.com/150'} alt={product?.name} />
      </Styled.ProductSectionLeft>
      <Styled.ProductSectionRight>
        <h1>💖 Baby Every 💙</h1>
        <h2>September 2025</h2>
        <h4>We can't wait to find out!</h4>
        <h4>Gender: Unknown🤔</h4>
        <h4>Description: Currently the size of a strawberry.</h4>
        <h4 style={{ display: 'flex', alignItems: 'center' }}>
          Price: <span style={{ fontSize: '3rem', fontWeight: 'bold', marginLeft: '5px', lineHeight: '0', }}>∞</span>
        </h4>

      </Styled.ProductSectionRight>
    </Styled.ProductDetailCard>
  );
};

export default ProductDetail;
