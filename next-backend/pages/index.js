import React from "react";
import { useRouter } from "next/router"; // Import useRouter from Next.js
import {
  HomeContain,
  Container,
  CallToAction,
  Testimonial,
  TestimonialSection,
  AddToCart,
  JuiceCard,
  JuiceGrid,
  Price,
  Section,
  HeroSection,
  HeroText,
  ShopButton
} from '../styles/styledComponents';
import heritageBG from "../public/images/juice/brand/heritageBG1.png"; 

const Home = () => {
  const { products, addToCart} = useContext(ProductsContext) || {}; // Safe destructuring
  const router = useRouter(); // Use Next.js useRouter hook
  const handleClick = () => {
    router.push('/productGrid'); // Use router.push to navigate to the /products route
  };

  return (
    <HomeContain className="min-h-screen flex flex-col bg-gray-100">
      <Container>
      {/* Hero Section */}
      <HeroSection style={{ backgroundImage: `url(${heritageBG})` }}>
        <HeroText>
          <h1>Fresh & Natural Juices</h1>
          <p>Delicious, healthy, and made with 100% natural ingredients.</p>
          <ShopButton onClick={handleClick}>Shop Now</ShopButton>
        </HeroText>
      </HeroSection>

      {/* Featured Juices */}
      <Section>
      <h2>Best Sellers</h2>
      <JuiceGrid>
        {products && products.length > 0 ? (
          products.map((product) => (
            <JuiceCard key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <Price>${product.price.toFixed(2)}</Price>
              <AddToCart onClick={() => addToCart(product)}>Add to Cart</AddToCart>
            </JuiceCard>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </JuiceGrid>
    </Section>


      {/* Customer Reviews */}
      <TestimonialSection>
        <h2>What Our Customers Say</h2>
        <Testimonial>
          <p>"Absolutely love the orange juice! So fresh and tasty!"</p>
          <span>— Sarah M.</span>
        </Testimonial>
        <Testimonial>
          <p>"Best juice ever! The mixed berry flavor is my favorite!"</p>
          <span>— James L.</span>
        </Testimonial>
      </TestimonialSection>

      {/* Call to Action */}
      <CallToAction>
        <h2>Order Fresh Juice Today!</h2>
        <ShopButton onClick={handleClick}>Shop Now</ShopButton>
      </CallToAction>
    </Container>
    </HomeContain>
  );
};

export default Home;
