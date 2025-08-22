import React, { useState } from "react";
import {
  ContactContain,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  ContentSection,
  ContactForm,
  FormTitle,
  FormDescription,
  Form,
  FormRow,
  FormGroup,
  Label,
  Input,
  TextArea,
  SubmitButton,
  ContactInfo,
  InfoTitle,
  InfoDescription,
  InfoList,
  InfoItem,
  InfoIcon,
  InfoContent,
  InfoLabel,
  InfoValue,
  MapSection,
  MapTitle,
  MapContainer,
  HoursSection,
  HoursTitle,
  HoursText
} from '../styles/contactStyledComponents.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <ContactContain>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Get in Touch</HeroTitle>
          <HeroSubtitle>
            Have questions about our juices? Want to place a bulk order? 
            We'd love to hear from you! Reach out to us anytime.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* Contact Form and Info Section */}
      <ContentSection>
        {/* Contact Form */}
        <ContactForm>
          <FormTitle>Send Us a Message</FormTitle>
          <FormDescription>
            Fill out the form below and we'll get back to you within 24 hours. 
            We're here to help with any questions about our products or services.
          </FormDescription>
          
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help you?"
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your inquiry, bulk order request, or any questions you have about our juices..."
                required
              />
            </FormGroup>
            
            <SubmitButton type="submit">
              Send Message
            </SubmitButton>
          </Form>
        </ContactForm>

        {/* Contact Information */}
        <ContactInfo>
          <InfoTitle>Contact Information</InfoTitle>
          <InfoDescription>
            Reach out to us through any of these channels. We're here to help!
          </InfoDescription>
          
          <InfoList>
            <InfoItem>
              <InfoIcon>Phone</InfoIcon>
              <InfoContent>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>(555) 123-4567</InfoValue>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>Email</InfoIcon>
              <InfoContent>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>hello@freshjuice.com</InfoValue>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>Address</InfoIcon>
              <InfoContent>
                <InfoLabel>Address</InfoLabel>
                <InfoValue>
                  123 Fresh Street<br />
                  Organic District<br />
                  Green City, GC 12345
                </InfoValue>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>Hours</InfoIcon>
              <InfoContent>
                <InfoLabel>Business Hours</InfoLabel>
                <InfoValue>
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </InfoValue>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>Delivery</InfoIcon>
              <InfoContent>
                <InfoLabel>Delivery</InfoLabel>
                <InfoValue>
                  Free delivery on orders over $50<br />
                  Same-day delivery available<br />
                  Bulk orders welcome
                </InfoValue>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>Support</InfoIcon>
              <InfoContent>
                <InfoLabel>Customer Support</InfoLabel>
                <InfoValue>
                  Available 24/7 via email<br />
                  Phone support during business hours<br />
                  Live chat coming soon
                </InfoValue>
              </InfoContent>
            </InfoItem>
          </InfoList>
        </ContactInfo>
      </ContentSection>

      {/* Map Section */}
      <MapSection>
        <MapTitle>Visit Our Location</MapTitle>
        <MapContainer>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>Map</div>
            <p>Interactive map coming soon!</p>
            <p style={{ marginTop: '1rem', opacity: 0.8 }}>
              123 Fresh Street, Organic District<br />
              Green City, GC 12345
            </p>
          </div>
        </MapContainer>
        
        <HoursSection>
          <HoursTitle>Business Hours</HoursTitle>
          <HoursText>
            Monday - Friday: 8:00 AM - 6:00 PM<br />
            Saturday: 9:00 AM - 4:00 PM<br />
            Sunday: Closed
          </HoursText>
        </HoursSection>
      </MapSection>
    </ContactContain>
  );
};

export default Contact;