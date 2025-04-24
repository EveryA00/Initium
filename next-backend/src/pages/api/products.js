import clientPromise from '../../../lib/mongodb';

async function getProducts() {
  try {
    const client = await clientPromise;
    const db = client.db(); // optional: pass a name here if needed
    const products = await db.collection('products').find({}).toArray();
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Could not fetch products');
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const products = await getProducts();
      res.status(200).json(products);
    } catch {
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
