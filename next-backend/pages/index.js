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
          <JuiceCard>
            <h3>Orange Juice</h3>
            <p>Freshly squeezed oranges for a refreshing taste.</p>
            <Price>$5.99</Price>
            <AddToCart>Add to Cart</AddToCart>
          </JuiceCard>

          <JuiceCard>
            <h3>Apple Juice</h3>
            <p>Sweet and crisp apples blended to perfection.</p>
            <Price>$6.49</Price>
            <AddToCart>Add to Cart</AddToCart>
          </JuiceCard>

          <JuiceCard>
            <h3>Mixed Berry Juice</h3>
            <p>A delicious mix of strawberries, blueberries, and raspberries.</p>
            <Price>$7.99</Price>
            <AddToCart>Add to Cart</AddToCart>
          </JuiceCard>
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
