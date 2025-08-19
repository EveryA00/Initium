// Script to add new products to MongoDB database
// Run this in MongoDB Shell: mongosh < add-products.js

// Connect to your database
use myjuice

// New products to add
const newProducts = [
  {
    id: 9,
    name: "Light Green Juice",
    description: "Light and refreshing green juice blend",
    price: 6.49,
    image: "/images/juice/product/light_green_juice.jpg",
    category: "vegetable",
    inStock: true,
    featured: false,
    createdAt: new Date()
  },
  {
    id: 10,
    name: "Premium Apple Juice",
    description: "Premium organic apple juice with natural sweetness",
    price: 7.99,
    image: "/images/juice/product/apple_BG.jpg",
    category: "fruit",
    inStock: true,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 11,
    name: "Premium Orange Juice",
    description: "Premium fresh-squeezed orange juice",
    price: 8.99,
    image: "/images/juice/product/orange_juiceBG.jpg",
    category: "fruit",
    inStock: true,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 12,
    name: "Blueberry Blend",
    description: "Rich blueberry juice blend with antioxidants",
    price: 9.99,
    image: "/images/juice/product/blueberry_BG.jpg",
    category: "fruit",
    inStock: true,
    featured: false,
    createdAt: new Date()
  },
  {
    id: 13,
    name: "Raspberry Delight",
    description: "Sweet and tangy raspberry juice",
    price: 7.49,
    image: "/images/juice/product/rasberry_BG.jpg",
    category: "fruit",
    inStock: true,
    featured: false,
    createdAt: new Date()
  },
  {
    id: 14,
    name: "Juice Collection",
    description: "Assorted juice collection for variety",
    price: 12.99,
    image: "/images/juice/product/juice_BG.jpg",
    category: "mixed",
    inStock: true,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 15,
    name: "Every Day Special",
    description: "Our signature daily juice blend",
    price: 11.99,
    image: "/images/juice/product/every2.jpg",
    category: "mixed",
    inStock: true,
    featured: true,
    createdAt: new Date()
  }
];

// Insert the new products
print("Adding new products to database...");
const result = db.products.insertMany(newProducts);
print("Successfully added " + result.insertedIds.length + " new products");

// Verify the products were added
print("\nTotal products in database: " + db.products.countDocuments());

// Show the new products
print("\nNew products added:");
db.products.find({id: {$in: [9, 10, 11, 12, 13, 14, 15]}}).forEach(function(product) {
  print("- " + product.name + " ($" + product.price + ")");
});

print("\nAll products in database:");
db.products.find().sort({id: 1}).forEach(function(product) {
  print(product.id + ". " + product.name + " - $" + product.price);
}); 