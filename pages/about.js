import React from "react";
import {
  AboutContain,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  ContentSection,
  SectionTitle,
  MissionSection,
  MissionTitle,
  MissionText,
  ValuesGrid,
  ValueCard,
  ValueIcon,
  ValueTitle,
  ValueDescription,
  TeamGrid,
  TeamCard,
  TeamAvatar,
  TeamName,
  TeamRole,
  TeamBio,
  StorySection,
  StoryContent,
  StoryTitle,
  StoryText,
  CTASection,
  CTATitle,
  CTAText,
  CTAButton
} from '../styles/aboutStyledComponent.js';

const About = () => {
  return (
    <AboutContain>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Our Story</HeroTitle>
          <HeroSubtitle>
            From humble beginnings to becoming the leading provider of fresh, organic juices. 
            We're passionate about bringing nature's best flavors to your table.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* Mission Section */}
      <ContentSection>
        <MissionSection>
          <MissionTitle>Our Mission</MissionTitle>
          <MissionText>
            We believe that nature provides everything we need for optimal health and vitality. 
            Our mission is to deliver the purest, most nutritious juices while supporting sustainable 
            farming practices and reducing our environmental footprint. Every bottle represents our 
            commitment to quality, health, and the planet.
          </MissionText>
        </MissionSection>
      </ContentSection>

      {/* Values Section */}
      <ContentSection>
        <SectionTitle>Our Values</SectionTitle>
        <ValuesGrid>
          <ValueCard>
            <ValueIcon>Organic</ValueIcon>
            <ValueTitle>Organic & Natural</ValueTitle>
            <ValueDescription>
              We source only the finest organic fruits and vegetables, ensuring every ingredient 
              meets our strict quality standards and supports sustainable farming practices.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>Health</ValueIcon>
            <ValueTitle>Health First</ValueTitle>
            <ValueDescription>
              Your health is our priority. We create juices that not only taste amazing but also 
              provide essential nutrients, vitamins, and minerals your body needs to thrive.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>Environment</ValueIcon>
            <ValueTitle>Environmental Care</ValueTitle>
            <ValueDescription>
              We're committed to protecting our planet through eco-friendly packaging, 
              waste reduction, and supporting local farmers who share our environmental values.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>Community</ValueIcon>
            <ValueTitle>Community Support</ValueTitle>
            <ValueDescription>
              We believe in giving back to our community by supporting local farmers, 
              participating in food drives, and educating others about healthy living.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>✨</ValueIcon>
            <ValueTitle>Innovation</ValueTitle>
            <ValueDescription>
              We continuously explore new flavor combinations and processing techniques 
              to bring you the most delicious and nutritious juices possible.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>🏆</ValueIcon>
            <ValueTitle>Excellence</ValueTitle>
            <ValueDescription>
              From farm to bottle, we maintain the highest standards of quality control 
              to ensure every product meets our customers' expectations.
            </ValueDescription>
          </ValueCard>
        </ValuesGrid>
      </ContentSection>

      {/* Our Story Section */}
      <StorySection>
        <StoryContent>
          <StoryTitle>How It All Began</StoryTitle>
          <StoryText>
            Founded in 2018, our journey started with a simple belief: that everyone deserves 
            access to pure, healthy, and delicious juices. What began as a small family operation 
            has grown into a beloved brand, but our commitment to quality and community has never wavered. 
            Today, we continue to honor our roots while embracing innovation and sustainability.
          </StoryText>
        </StoryContent>
      </StorySection>

      {/* Team Section */}
      <ContentSection>
        <SectionTitle>Meet Our Team</SectionTitle>
        <TeamGrid>
          <TeamCard>
            <TeamAvatar>👨‍🌾</TeamAvatar>
            <TeamName>Michael Chen</TeamName>
            <TeamRole>Founder & CEO</TeamRole>
            <TeamBio>
              A former nutritionist with a passion for healthy living, Michael started this company 
              with a vision to make organic juices accessible to everyone. His expertise in nutrition 
              and sustainable farming drives our product development.
            </TeamBio>
          </TeamCard>
          
          <TeamCard>
            <TeamAvatar>👩‍🔬</TeamAvatar>
            <TeamName>Dr. Sarah Johnson</TeamName>
            <TeamRole>Head of Quality & Nutrition</TeamRole>
            <TeamBio>
              With a PhD in Food Science, Sarah ensures every product meets our nutritional standards. 
              Her research background helps us create juices that are both delicious and beneficial.
            </TeamBio>
          </TeamCard>
          
          <TeamCard>
            <TeamAvatar>👨‍💼</TeamAvatar>
            <TeamName>David Rodriguez</TeamName>
            <TeamRole>Operations Director</TeamRole>
            <TeamBio>
              David manages our day-to-day operations, from sourcing ingredients to ensuring 
              our production facilities maintain the highest standards of quality and safety.
            </TeamBio>
          </TeamCard>
          
          <TeamCard>
            <TeamAvatar>👩‍🎨</TeamAvatar>
            <TeamName>Emma Thompson</TeamName>
            <TeamRole>Creative Director</TeamRole>
            <TeamBio>
              Emma brings our brand to life through innovative packaging design and marketing. 
              Her creative vision helps us connect with customers who share our values.
            </TeamBio>
          </TeamCard>
          
          <TeamCard>
            <TeamAvatar>👨‍🌾</TeamAvatar>
            <TeamName>Carlos Mendez</TeamName>
            <TeamRole>Head of Sustainability</TeamRole>
            <TeamBio>
              Carlos leads our environmental initiatives, working with farmers and suppliers 
              to ensure sustainable practices throughout our supply chain.
            </TeamBio>
          </TeamCard>
          
          <TeamCard>
            <TeamAvatar>👩‍💻</TeamAvatar>
            <TeamName>Lisa Park</TeamName>
            <TeamRole>Customer Experience Manager</TeamRole>
            <TeamBio>
              Lisa ensures every customer interaction reflects our commitment to excellence. 
              Her dedication to customer satisfaction helps us build lasting relationships.
            </TeamBio>
          </TeamCard>
        </TeamGrid>
      </ContentSection>

      {/* Call to Action Section */}
      <CTASection>
        <CTATitle>Join Our Journey</CTATitle>
        <CTAText>
          Experience the difference that fresh, organic juices can make in your life. 
          Start your health journey with us today and discover nature's purest flavors.
        </CTAText>
        <CTAButton onClick={() => window.location.href = '/'}>
          Explore Our Juices
        </CTAButton>
      </CTASection>
    </AboutContain>
  );
};

export default About;
