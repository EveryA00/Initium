import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import ProductCard from "./productCard";
import { ProductsContext } from "../context/ProductsContext";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
`;

const HeroSection = styled.section`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2E5A27 0%, #4A7C59 100%);
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/images/juice/product/juice_BG.jpg') center/cover;
  opacity: 0.1;
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  animation: ${fadeInUp} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 1rem;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #ffffff;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
  font-weight: 300;
`;

const CTAButton = styled.button`
  background: #ffffff;
  color: #2E5A27;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: #F5E6D3;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const Section = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: #2E5A27;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled.p`
  font-size: 1.3rem;
  color: #666;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const ProductCardStyled = styled.div`
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${slideInLeft} 0.8s ease-out;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
  
  &:nth-child(even) {
    animation: ${slideInRight} 0.8s ease-out;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ProductContent = styled.div`
  padding: 2rem;
`;

const ProductName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2E5A27;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ProductPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  color: #2E5A27;
  margin-bottom: 1rem;
`;

const ShopButton = styled.button`
  background: #2E5A27;
  color: #ffffff;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: #4A7C59;
    transform: translateY(-2px);
  }
`;

const BenefitsSection = styled.div`
  background: #F5E6D3;
  padding: 6rem 0;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const BenefitCard = styled.div`
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const BenefitIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #2E5A27;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #ffffff;
`;

const BenefitTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2E5A27;
  margin-bottom: 1rem;
`;

const BenefitDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const IngredientsSection = styled.div`
  background: #ffffff;
  padding: 6rem 0;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const IngredientCard = styled.div`
  background: #ffffff;
  border: 2px solid #F5E6D3;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out;
  
  &:hover {
    border-color: #2E5A27;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(46, 90, 39, 0.1);
  }
`;

const IngredientNumber = styled.div`
  width: 50px;
  height: 50px;
  background: #2E5A27;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin: 0 auto 1rem;
`;

const IngredientTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2E5A27;
  margin-bottom: 0.5rem;
`;

const IngredientDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.9rem;
`;

const FinalCTASection = styled.div`
  background: linear-gradient(135deg, #2E5A27 0%, #4A7C59 100%);
  padding: 6rem 0;
  text-align: center;
`;

const FinalCTATitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const FinalCTASubtitle = styled.p`
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
`;

const FinalCTAButton = styled(CTAButton)`
  background: #ffffff;
  color: #2E5A27;
  
  &:hover {
    background: #F5E6D3;
  }
`;

const Home = () => {
  const { products, cart, removeFromCart, addToCart, updateQuantity } = useContext(ProductsContext) || {};
  const router = useRouter();

  const handleShopClick = () => {
    router.push('/productGrid');
  };

  const featuredProducts = products?.slice(0, 6) || [];

  const benefits = [
    {
      icon: "🌱",
      title: "100% Organic",
      description: "All ingredients sourced from certified organic farms"
    },
    {
      icon: "⚡",
      title: "Fresh Daily",
      description: "Pressed fresh every morning for maximum nutrition"
    },
    {
      icon: "💚",
      title: "No Preservatives",
      description: "Pure juice with no artificial additives or preservatives"
    },
    {
      icon: "🚚",
      title: "Same Day Delivery",
      description: "Delivered to your door within hours of pressing"
    }
  ];

  const ingredients = [
    {
      number: "01",
      title: "Fresh Fruits",
      description: "Hand-picked at peak ripeness for maximum flavor and nutrition"
    },
    {
      number: "02",
      title: "Organic Vegetables",
      description: "Certified organic vegetables for clean, pure taste"
    },
    {
      number: "03",
      title: "Natural Sweeteners",
      description: "Only natural sweeteners like honey and agave when needed"
    },
    {
      number: "04",
      title: "Pure Water",
      description: "Filtered spring water for the perfect consistency"
    },
    {
      number: "05",
      title: "Fresh Herbs",
      description: "Aromatic herbs for enhanced flavor and health benefits"
    },
    {
      number: "06",
      title: "No Additives",
      description: "Absolutely no artificial flavors, colors, or preservatives"
    }
  ];

  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <HeroTitle>Heritage Juices</HeroTitle>
          <HeroSubtitle>
            Pure, fresh-pressed juices made with 100% organic ingredients. 
            Delivered fresh to your door every day.
          </HeroSubtitle>
          <CTAButton onClick={handleShopClick}>
            Shop Now
          </CTAButton>
        </HeroContent>
      </HeroSection>

      {/* Featured Products */}
      <Section>
        <Container>
          <SectionTitle>Our Signature Juices</SectionTitle>
          <SectionSubtitle>
            Each bottle is pressed fresh daily with the finest organic ingredients
          </SectionSubtitle>
          <ProductGrid>
            {featuredProducts.map((product, index) => (
              <ProductCardStyled key={product.id}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductContent>
                  <ProductName>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductPrice>${product.price}</ProductPrice>
                  <ShopButton onClick={() => addToCart(product)}>
                    Add to Cart
                  </ShopButton>
                </ProductContent>
              </ProductCardStyled>
            ))}
          </ProductGrid>
        </Container>
      </Section>

      {/* Benefits Section */}
      <BenefitsSection>
        <Container>
          <SectionTitle>Why Choose Heritage?</SectionTitle>
          <SectionSubtitle>
            We're committed to delivering the purest, most nutritious juices possible
          </SectionSubtitle>
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitCard key={index}>
                <BenefitIcon>{benefit.icon}</BenefitIcon>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitDescription>{benefit.description}</BenefitDescription>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </Container>
      </BenefitsSection>

      {/* Ingredients Section */}
      <IngredientsSection>
        <Container>
          <SectionTitle>What's Inside Every Bottle</SectionTitle>
          <SectionSubtitle>
            Transparency in every ingredient. Here's what makes our juices special.
          </SectionSubtitle>
          <IngredientsGrid>
            {ingredients.map((ingredient, index) => (
              <IngredientCard key={index}>
                <IngredientNumber>{ingredient.number}</IngredientNumber>
                <IngredientTitle>{ingredient.title}</IngredientTitle>
                <IngredientDescription>{ingredient.description}</IngredientDescription>
              </IngredientCard>
            ))}
          </IngredientsGrid>
        </Container>
      </IngredientsSection>

      {/* Final CTA */}
      <FinalCTASection>
        <Container>
          <FinalCTATitle>Ready to Experience Fresh Juice?</FinalCTATitle>
          <FinalCTASubtitle>
            Join thousands of customers who have discovered the difference fresh-pressed juice makes in their daily routine.
          </FinalCTASubtitle>
          <FinalCTAButton onClick={handleShopClick}>
            Start Your Journey
          </FinalCTAButton>
        </Container>
      </FinalCTASection>
    </HomeContainer>
  );
};

export default Home;
