# Unsplash API Integration Guide

## 🖼️ Setting Up Unsplash API

### 1. Get Your Free API Key
1. Go to [https://unsplash.com/developers](https://unsplash.com/developers)
2. Sign up for a free account
3. Create a new application
4. Copy your `Access Key`

### 2. Configure Environment Variables
Create a `.env.local` file in your project root:

```bash
# Unsplash API Configuration
UNSPLASH_ACCESS_KEY=your_actual_access_key_here
```

### 3. API Usage
The site now uses Unsplash images for:
- Product images (fruit juices)
- Hero background images
- Ingredient showcase images

### 4. Image URLs Used
- **Orange Juice**: `https://images.unsplash.com/photo-1621506289937-a8e4df240d0b`
- **Apple Juice**: `https://images.unsplash.com/photo-1559827260-dc66d52bef19`
- **Green Juice**: `https://images.unsplash.com/photo-1625937286074-9ca519d5d9df`
- **Berry Juices**: `https://images.unsplash.com/photo-1553530666-ba11a7da3888`

### 5. Benefits
- ✅ High-quality, professional images
- ✅ Free for commercial use
- ✅ Optimized for web
- ✅ Consistent visual style
- ✅ No local storage needed

### 6. API Endpoints
- `/api/images?query=fruit+juice&count=10` - Search for images
- `/api/products` - Products with Unsplash images

### 7. Image Optimization
All images use Unsplash's built-in optimization:
- `w=400&h=400&fit=crop` for product images
- `w=1920&h=1080&fit=crop` for hero backgrounds
- `w=400&h=300&fit=crop` for ingredient cards

## 🚀 Deployment
Make sure to add your `UNSPLASH_ACCESS_KEY` to your Vercel environment variables for production deployment. 