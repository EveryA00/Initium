import clientPromise from '../../lib/mongodb';

async function getProducts() {
  try {
    const client = await clientPromise;
    const db = client.db('products'); // database name from MongoDB Atlas
    const products = await db.collection('products').find({}).toArray();
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Could not fetch products');
  }
}

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
      }
    ];
    
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
}
