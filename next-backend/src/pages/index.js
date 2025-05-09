import React from "react";
import { useRouter } from "next/router"; // Import useRouter from Next.js
import { Styled } from '.styles/styledComponents.js';
import heritageBG from "../../public/images/juice/brand/heritageBG1.png"; 

const Home = () => {
  const router = useRouter(); // Use Next.js useRouter hook
  const handleClick = () => {
    router.push('/products'); // Use router.push to navigate to the /products route
  };

  return (
    <Styled.Home className="min-h-screen flex flex-col bg-gray-100">
      <Styled.Container>
      {/* Hero Section */}
      <Styled.HeroSection style={{ backgroundImage: `url(${heritageBG})` }}>
        <Styled.HeroText>
          <h1>Fresh & Natural Juices</h1>
          <p>Delicious, healthy, and made with 100% natural ingredients.</p>
          <Styled.ShopButton onClick={handleClick}>Shop Now</Styled.ShopButton>
        </Styled.HeroText>
      </Styled.HeroSection>

      {/* Featured Juices */}
      <Styled.Section>
        <h2>Best Sellers</h2>
        <Styled.JuiceGrid>
          <Styled.JuiceCard>
            <img src={require("../../../../images/juice/product/orange_juice.jpg")} alt="Orange Juice" />
            <h3>Orange Juice</h3>
            <p>Freshly squeezed oranges for a refreshing taste.</p>
            <Styled.Price>$5.99</Styled.Price>
            <Styled.AddToCart>Add to Cart</Styled.AddToCart>
          </Styled.JuiceCard>

          <Styled.JuiceCard>
            <img src={require("../../../../images/juice/product/apple_juice.jpg")} alt="Apple Juice" />
            <h3>Apple Juice</h3>
            <p>Sweet and crisp apples blended to perfection.</p>
            <Styled.Price>$6.49</Styled.Price>
            <Styled.AddToCart>Add to Cart</Styled.AddToCart>
          </Styled.JuiceCard>

          <Styled.JuiceCard>
            <img src={require("../../../../images/juice/product/pomegranetjuice.jpg")} alt="Berry Juice" />
            <h3>Mixed Berry Juice</h3>
            <p>A delicious mix of strawberries, blueberries, and raspberries.</p>
            <Styled.Price>$7.99</Styled.Price>
            <Styled.AddToCart>Add to Cart</Styled.AddToCart>
          </Styled.JuiceCard>
        </Styled.JuiceGrid>
      </Styled.Section>

      {/* Customer Reviews */}
      <Styled.TestimonialSection>
        <h2>What Our Customers Say</h2>
        <Styled.Testimonial>
          <p>"Absolutely love the orange juice! So fresh and tasty!"</p>
          <span>— Sarah M.</span>
        </Styled.Testimonial>
        <Styled.Testimonial>
          <p>"Best juice ever! The mixed berry flavor is my favorite!"</p>
          <span>— James L.</span>
        </Styled.Testimonial>
      </Styled.TestimonialSection>

      {/* Call to Action */}
      <Styled.CallToAction>
        <h2>Order Fresh Juice Today!</h2>
        <Styled.ShopButton onClick={handleClick}>Shop Now</Styled.ShopButton>
      </Styled.CallToAction>
    </Styled.Container>
    </Styled.Home>
  );
};

export default Home;
