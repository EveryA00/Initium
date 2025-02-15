import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);  // MongoDB URI from your environment variable

// Helper function to connect to MongoDB and fetch products
async function getProducts() {
  try {
    await client.connect();  // Connect to MongoDB
    const db = client.db();  // Use the default database
    const productsCollection = db.collection('products');  // Use the 'products' collection

    // Fetch all products from the collection
    const products = await productsCollection.find({}).toArray();
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Could not fetch products');
  } finally {
    await client.close();  // Always close the connection when done
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or specify a domain like 'http://localhost:8080'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const products = await getProducts(); // Fetch products from MongoDB
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
