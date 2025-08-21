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

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(46, 90, 39, 0.8) 0%, rgba(245, 230, 211, 0.9) 100%);
  position: relative;
  overflow: hidden;
  padding-top: 80px; /* Add space for fixed navigation */
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${({ imageUrl }) => imageUrl ? `url(${imageUrl})` : 'linear-gradient(135deg, rgba(46, 90, 39, 0.8) 0%, rgba(245, 230, 211, 0.9) 100%)'};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: 1;
  opacity: 0.4;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(46, 90, 39, 0.7) 0%, rgba(245, 230, 211, 0.8) 100%);
  z-index: 2;
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: ${float} 6s ease-in-out infinite;
  
  &:nth-child(1) {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 10%;
    animation-delay: 2s;
  }
  
  &:nth-child(3) {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 4;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const HeroSection = styled.section`
  min-height: calc(100vh - 80px); /* Subtract navigation height */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.hero} 0;
  position: relative;
  z-index: 3;
`;

const HeroContent = styled.div`
  animation: ${fadeInUp} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.display};
  font-size: clamp(2.5rem, 8vw, ${({ theme }) => theme.typography.h1});
  font-weight: ${({ theme }) => theme.typography.extrabold};
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(255, 255, 255, 0.9);
  position: relative;
  z-index: 3;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 3vw, ${({ theme }) => theme.typography.fontSizeLarge});
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 3;
`;

const CTAButton = styled.button`
  background: ${({ theme }) => theme.colors.gradients.accent};
  color: ${({ theme }) => theme.colors.textWhite};
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xxl};
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  font-weight: ${({ theme }) => theme.typography.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${pulse} 2s ease-in-out infinite;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, ${({ theme }) => theme.typography.h2});
  font-weight: ${({ theme }) => theme.typography.bold};
  color: ${({ theme }) => theme.colors.textDark};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(93, 64, 55, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: 0 8px 32px rgba(93, 64, 55, 0.1);
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    box-shadow: 0 12px 40px rgba(93, 64, 55, 0.15);
    transform: translateY(-5px);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xxl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const TestimonialCard = styled(GlassCard)`
  text-align: center;
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSizeLarge};
    color: ${({ theme }) => theme.colors.textDark};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-style: italic;
    line-height: 1.6;
  }
  
  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.typography.semibold};
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const StatCard = styled(GlassCard)`
  text-align: center;
  
  h3 {
    font-size: ${({ theme }) => theme.typography.h1};
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textDark};
    font-weight: ${({ theme }) => theme.typography.medium};
  }
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const IngredientCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.glassHover};
  }
`;

const IngredientImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg} 0 0;
`;

const IngredientContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const IngredientTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.h4};
  font-weight: ${({ theme }) => theme.typography.bold};
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const IngredientDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  font-size: ${({ theme }) => theme.typography.fontSize};
`;

const Home = () => {
  const { products, cart, removeFromCart, addToCart, updateQuantity } = useContext(ProductsContext) || {};
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch background image from Unsplash
  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch('/api/images?query=fresh+fruits+juice&count=1');
        const data = await response.json();
        if (data.success && data.images.length > 0) {
          setBackgroundImage(data.images[0].url);
        }
      } catch (error) {
        console.log('Using fallback background');
      }
    };
    
    fetchBackgroundImage();
  }, []);

  const handleShopClick = () => {
    router.push('/productGrid');
  };

  const featuredProducts = products?.slice(0, 3) || [];

    return (
    <HomeContainer>
      <BackgroundImage imageUrl={backgroundImage} />
      <BackgroundOverlay />
      
      <Content>
        {/* Hero Section */}
        <HeroSection>
          <HeroContent>
            <HeroTitle>Heritage Juices Co.</HeroTitle>
            <HeroSubtitle>
              Experience the pure taste of nature with our handcrafted juices. 
              Made with 100% organic ingredients, delivered fresh to your door.
            </HeroSubtitle>
            <CTAButton 
              onClick={handleShopClick}
              aria-label="Explore our juice collection"
            >
              Explore Our Juices
            </CTAButton>
          </HeroContent>
        </HeroSection>

        {/* Stats Section */}
        <Section>
          <StatsSection>
            <StatCard>
              <h3>15+</h3>
              <p>Heritage Flavors</p>
            </StatCard>
            <StatCard>
              <h3>100%</h3>
              <p>Organic Ingredients</p>
            </StatCard>
            <StatCard>
              <h3>500+</h3>
              <p>Heritage Customers</p>
            </StatCard>
            <StatCard>
              <h3>24h</h3>
              <p>Fresh Delivery</p>
            </StatCard>
          </StatsSection>
        </Section>

        {/* Featured Products */}
        <Section>
          <SectionTitle>Best Sellers</SectionTitle>
          <ProductGrid>
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </ProductGrid>
        </Section>

        {/* Fresh Ingredients Section */}
        <Section>
          <SectionTitle>Fresh From Nature</SectionTitle>
          <IngredientsGrid>
            <IngredientCard>
              <IngredientImage src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop" alt="Fresh Apples" />
              <IngredientContent>
                <IngredientTitle>Fresh Apples</IngredientTitle>
                <IngredientDescription>
                  Hand-picked from local orchards, our apples provide the perfect balance of sweetness and tartness.
                </IngredientDescription>
              </IngredientContent>
            </IngredientCard>
            
            <IngredientCard>
              <IngredientImage src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop" alt="Organic Oranges" />
              <IngredientContent>
                <IngredientTitle>Organic Oranges</IngredientTitle>
                <IngredientDescription>
                  Sun-ripened oranges bursting with vitamin C and natural citrus flavor.
                </IngredientDescription>
              </IngredientContent>
            </IngredientCard>
            
            <IngredientCard>
              <IngredientImage src="https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop" alt="Fresh Berries" />
              <IngredientContent>
                <IngredientTitle>Fresh Berries</IngredientTitle>
                <IngredientDescription>
                  Antioxidant-rich berries picked at peak ripeness for maximum flavor and nutrition.
                </IngredientDescription>
              </IngredientContent>
            </IngredientCard>
          </IngredientsGrid>
        </Section>

        {/* Testimonials */}
        <Section>
          <SectionTitle>What Our Customers Say</SectionTitle>
          <TestimonialGrid>
            <TestimonialCard>
              <p>
                "Absolutely love the orange juice! So fresh and tasty! 
                It's become a daily ritual for me."
              </p>
              <span>— Sarah M.</span>
            </TestimonialCard>
            <TestimonialCard>
              <p>
                "Best juice ever! The mixed berry flavor is my favorite! 
                I can taste the difference in quality."
              </p>
              <span>— James L.</span>
            </TestimonialCard>
            <TestimonialCard>
              <p>
                "The green juice is amazing! I feel so energized after drinking it. 
                Highly recommend!"
              </p>
              <span>— Maria K.</span>
            </TestimonialCard>
          </TestimonialGrid>
        </Section>

        {/* Final CTA */}
        <Section>
          <GlassCard style={{ textAlign: 'center' }}>
            <SectionTitle>Ready to Experience Fresh Juice?</SectionTitle>
            <HeroSubtitle style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem' }}>
              Join thousands of customers who have discovered the difference fresh juice makes.
            </HeroSubtitle>
            <CTAButton 
              onClick={handleShopClick}
              aria-label="Shop our juice collection"
            >
              Shop Now
            </CTAButton>
          </GlassCard>
        </Section>
      </Content>
    </HomeContainer>
  );
};

export default Home;
