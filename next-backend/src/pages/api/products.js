import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI); // Ensure this is the correct MongoDB URI

async function getProducts() {
  try {
    await client.connect();
    const db = client.db();
    const productsCollection = db.collection('products');
    const products = await productsCollection.find({}).toArray();
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Could not fetch products');
  } finally {
    await client.close();
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS method (pre-flight request)
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
