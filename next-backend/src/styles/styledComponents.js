import { styled, withConfig } from "styled-components";

// Styled component named StyledButton
export const HomeContain = styled.div`
  background-color: #fff;
  margin: 1rem;
`;

// Styled Components
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #f8f9fa;
`;

export const HeroSection = styled.div`
  width: 100%;
  height: 60vh;
  background: url('../../../../images/juice/brand/heritageBG1.png') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeroText = styled.div`
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 20px 40px;
  border-radius: 10px;
`;

export const ShopButton = styled.button`
  padding: 12px 20px;
  margin-top: 10px;
  background: linear-gradient(135deg, #ff7f50, #ff4500);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background: linear-gradient(135deg, #ff4500, #e63900);
    transform: translateY(-2px);
  }
`;

export const Section = styled.div`
  margin: 40px 0;
  h2 {
    margin-bottom: 20px;
  }
`;

export const JuiceGrid = styled.div`
  display: flex;
  gap: 20px;
`;

export const JuiceCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

export const Price = styled.p`
  font-weight: bold;
  color: #ff4500;
`;

export const AddToCart = styled.button`
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  
  &:hover {
    background: #218838;
  }
`;

export const TestimonialSection = styled.div`
  background: #fff3cd;
  padding: 30px;
  border-radius: 10px;
  margin: 40px 0;
`;

export const Testimonial = styled.div`
  font-style: italic;
  margin: 10px 0;
`;

export const CallToAction = styled.div`
  background: #ff4500;
  color: white;
  padding: 40px;
  border-radius: 10px;
  margin: 20px 0;
`;