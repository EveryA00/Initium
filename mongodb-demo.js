// MongoDB Shell Demo Script
// This file shows you how to use MongoDB Shell with your Atlas database

/*
CONNECTING TO MONGODB ATLAS:

1. Connect using the connection string:
   mongosh "mongodb+srv://eveama00@gmail.com:Amevery9119@cluster23706.ockqq.mongodb.net/"

2. Or connect step by step:
   mongosh
   use("mongodb+srv://eveama00@gmail.com:Amevery9119@cluster23706.ockqq.mongodb.net/")

BASIC COMMANDS:

// Show all databases
show dbs

// Switch to a specific database
use myDatabase

// Show collections in current database
show collections

// Show current database
db

// Show current user
db.runCommand({connectionStatus : 1})

CRUD OPERATIONS:

// INSERT - Create a new document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  createdAt: new Date()
})

// INSERT - Create multiple documents
db.users.insertMany([
  {name: "Jane Smith", email: "jane@example.com", age: 25},
  {name: "Bob Johnson", email: "bob@example.com", age: 35}
])

// FIND - Query documents
db.users.find()                    // Find all documents
db.users.find().pretty()           // Pretty print results
db.users.findOne({name: "John"})   // Find one document
db.users.find({age: {$gt: 25}})    // Find users older than 25

// UPDATE - Modify documents
db.users.updateOne(
  {email: "john@example.com"},
  {$set: {age: 31}}
)

db.users.updateMany(
  {age: {$lt: 30}},
  {$inc: {age: 1}}
)

// DELETE - Remove documents
db.users.deleteOne({email: "john@example.com"})
db.users.deleteMany({age: {$lt: 25}})

AGGREGATION:

// Count documents
db.users.countDocuments()

// Group by age
db.users.aggregate([
  {$group: {_id: "$age", count: {$sum: 1}}}
])

// Sort by age descending
db.users.find().sort({age: -1})

// Limit results
db.users.find().limit(5)

// Skip results
db.users.find().skip(5).limit(5)

INDEXES:

// Create an index
db.users.createIndex({email: 1})

// Create a unique index
db.users.createIndex({email: 1}, {unique: true})

// Show indexes
db.users.getIndexes()

// Drop an index
db.users.dropIndex("email_1")

DATABASE OPERATIONS:

// Create a new database
use newDatabase

// Drop current database
db.dropDatabase()

// Copy a collection
db.users.copyTo("users_backup")

// Export data
// (Use mongoexport command line tool)

// Import data
// (Use mongoimport command line tool)

HELP AND UTILITIES:

// Get help
help

// Show available commands
db.help()

// Show collection methods
db.users.help()

// Exit MongoDB Shell
exit
quit()

// Clear screen
cls

// Show current date
new Date()

// Show MongoDB version
db.version()
*/

console.log("MongoDB Shell Demo Script");
console.log("Run these commands in MongoDB Shell to interact with your database"); 