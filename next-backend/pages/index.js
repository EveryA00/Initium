import React, { useContext } from "react";
import { useRouter } from "next/router";
import {
  HomeContain,
  Container,
  CallToAction,
  Testimonial,
  TestimonialSection,
  Section,
  HeroSection,
  HeroText,
  ShopButton,
  JuiceGrid
} from "../styles/styledComponents";
import heritageBG from "../public/images/juice/brand/heritageBG1.png"; 
import ProductCard from "./productCard";
import { ProductsContext } from "../context/ProductsContext";

const Home = () => {
  const { products, cart, removeFromCart, addToCart, updateQuantity } = useContext(ProductsContext) || {};
  const router = useRouter();

  const handleClick = () => {
    router.push('/productGrid');
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
            {products?.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
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
