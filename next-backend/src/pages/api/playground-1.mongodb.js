/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('products');

// Insert a few documents into the sales collection.
// db.getCollection('products').insertMany([
//     { id: 'pomegranate-juice', name: "Pomegranate Juice", image: 'http://localhost:3000/images/juice/product/pomegranetjuice.jpg',  secondImage: 'http://localhost:3000/images/juice/product/every2.jpg', price: "$5.99", quantity: 23 },
//     { id: 'orange-juice', name: "Orange Juice", image: 'http://localhost:3000/images/juice/product/orange_juice.jpg', secondImage: 'http://localhost:3000/images/juice/product/every2.jpg', price: "$4.99", quantity: 42 },
//     { id: 'apple-juice', name: "Apple Juice", image: 'http://localhost:3000/images/juice/product/apple_juice.jpg', secondImage: 'http://localhost:3000/images/juice/product/every2.jpg', price: "$3.99", quantity: 50 },
//     { id: 'grape-juice', name: "Grape Juice", image: 'http://localhost:3000/images/juice/product/grape_juice.jpg', secondImage: 'http://localhost:3000/images/juice/product/every2.jpg', price: "$6.99", quantity: 10 },
//     { id: 'green-juice', name: "Green Juice", image: 'http://localhost:3000/images/juice/product/green_juice.jpg',  secondImage: 'http://localhost:3000/images/juice/product/every2.jpg', price: "$5.99", quantity: 23 },
//     { id: 'light-green-juice', name: "Diet Green Juice", image: 'http://localhost:3000/images/juice/product/light_green_juice.jpg', secondImage: 'http://localhost:3000/images/juice/product/every2.jpg', price: "$4.99", quantity: 42 },
//     { id: 'rasberry-juice', name: "Razzburry Juice", image: 'http://localhost:3000/images/juice/product/rasberry_juice.jpg', secondImage: 'http://localhost:3000/images/juice/product/every2.jpg', price: "$3.99", quantity: 50 },
//     { id: 'carrot-juice', name: "Carrot Juice", image: 'http://localhost:3000/images/juice/product/carrot_juice.jpg', secondImage: 'http://localhost:3000/images/juice/product/every2.jpg', price: "$6.99", quantity: 10 }
// ]);

db.getCollection('products').find().pretty();