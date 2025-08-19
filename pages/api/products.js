// Removed MongoDB dependency - using static data instead

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Sample products data
    const products = [
      {
        id: 1,
        name: "Apple Juice",
        description: "Fresh and natural apple juice",
        price: 4.99,
        image: "/images/juice/product/apple_juice.jpg",
        category: "fruit"
      },
      {
        id: 2,
        name: "Orange Juice",
        description: "Vitamin C rich orange juice",
        price: 5.99,
        image: "/images/juice/product/orange_juice.jpg",
        category: "fruit"
      },
      {
        id: 3,
        name: "Green Juice",
        description: "Healthy green vegetable juice",
        price: 6.99,
        image: "/images/juice/product/green_juice.jpg",
        category: "vegetable"
      },
      {
        id: 4,
        name: "Carrot Juice",
        description: "Nutritious carrot juice",
        price: 4.49,
        image: "/images/juice/product/carrot_juice.jpg",
        category: "vegetable"
      },
      {
        id: 5,
        name: "Blueberry Juice",
        description: "Antioxidant-rich blueberry juice",
        price: 7.99,
        image: "/images/juice/product/blueberry_BG.jpg",
        category: "fruit"
      },
      {
        id: 6,
        name: "Pomegranate Juice",
        description: "Heart-healthy pomegranate juice",
        price: 8.99,
        image: "/images/juice/product/pomegranetjuice.jpg",
        category: "fruit"
      },
      {
        id: 7,
        name: "Raspberry Juice",
        description: "Delicious raspberry juice",
        price: 6.49,
        image: "/images/juice/product/rasberry_juice.jpg",
        category: "fruit"
      },
      {
        id: 8,
        name: "Grape Juice",
        description: "Sweet and refreshing grape juice",
        price: 5.49,
        image: "/images/juice/product/grape_juice.jpg",
        category: "fruit"
      },
      {
        id: 9,
        name: "Light Green Juice",
        description: "Light and refreshing green juice blend",
        price: 6.49,
        image: "/images/juice/product/light_green_juice.jpg",
        category: "vegetable"
      },
      {
        id: 10,
        name: "Premium Apple Juice",
        description: "Premium organic apple juice with natural sweetness",
        price: 7.99,
        image: "/images/juice/product/apple_BG.jpg",
        category: "fruit"
      },
      {
        id: 11,
        name: "Premium Orange Juice",
        description: "Premium fresh-squeezed orange juice",
        price: 8.99,
        image: "/images/juice/product/orange_juiceBG.jpg",
        category: "fruit"
      },
      {
        id: 12,
        name: "Blueberry Blend",
        description: "Rich blueberry juice blend with antioxidants",
        price: 9.99,
        image: "/images/juice/product/blueberry_BG.jpg",
        category: "fruit"
      },
      {
        id: 13,
        name: "Raspberry Delight",
        description: "Sweet and tangy raspberry juice",
        price: 7.49,
        image: "/images/juice/product/rasberry_BG.jpg",
        category: "fruit"
      },
      {
        id: 14,
        name: "Juice Collection",
        description: "Assorted juice collection for variety",
        price: 12.99,
        image: "/images/juice/product/juice_BG.jpg",
        category: "mixed"
      },
      {
        id: 15,
        name: "Every Day Special",
        description: "Our signature daily juice blend",
        price: 11.99,
        image: "/images/juice/product/every2.jpg",
        category: "mixed"
      }
    ];
    
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
}
