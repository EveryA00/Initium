import React, { useContext } from "react";
import { useRouter } from "next/router";
import {
  ProductDetailCard,
  ProductSectionLeft,
  ProductSectionRight,
  Img,
} from "../styles/productDetailsStyledComponents";
import { ProductsContext } from "../context/ProductsContext";

const ProductDetail = () => {
    const context = useContext(ProductsContext);
  
    if (!context) {
      return <p>Loading context...</p>; // or handle it some other way
    }
  
  const { products = [] } = context; // Access products from context
  const router = useRouter(); // Access Next.js router
  const { productId } = router.query; // Access the productId from the URL

  // If products are still loading or productId is not available yet
  if (!products || products.length === 0) {
    return <h2>Loading products...</h2>; // You can improve this with a loading spinner if needed
  }

  if (!productId) {
    return <h2>Loading product details...</h2>; // If productId is not available yet (during initial render)
  }

  // Find the product based on the productId
  const product = products?.find((p) => p.id === productId);

  // If no product is found for the given productId
  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <ProductDetailCard>
      <ProductSectionLeft>
        <Img
          src={product?.secondImage || "https://via.placeholder.com/150"}
          alt={product?.name}
        />
      </ProductSectionLeft>
      <ProductSectionRight>
        <h1>{product?.name}</h1>
        <h2>{product?.releaseDate || "September 2025"}</h2>
        <h4>{product?.description || "Product description unavailable"}</h4>
        <h4 style={{ display: "flex", alignItems: "center" }}>
          Price:{" "}
          <span
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginLeft: "5px",
              lineHeight: "0",
            }}
          >
            ${(product?.price || 0).toFixed(2)}
          </span>
        </h4>
      </ProductSectionRight>
    </ProductDetailCard>
  );
};

export default ProductDetail;
