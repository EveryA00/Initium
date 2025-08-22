# MongoDB CLI Tools Guide

## What's Installed

✅ **MongoDB Shell (mongosh)** - Version 2.5.6
✅ **MongoDB Atlas CLI (atlas)** - Version 1.46.2

## Quick Start

### 1. Connect to Your MongoDB Atlas Database

**Option A: Use the connection script**
```bash
./connect-mongodb.sh
```

**Option B: Direct connection**
```bash
mongosh "mongodb+srv://eveama00@gmail.com:Amevery9119@cluster23706.ockqq.mongodb.net/"
```

**Option C: Connect to specific database**
```bash
mongosh "mongodb+srv://eveama00@gmail.com:Amevery9119@cluster23706.ockqq.mongodb.net/myDatabase"
```

### 2. Basic MongoDB Shell Commands

Once connected, you'll see a prompt like: `Cluster23706>`

```javascript
// Show all databases
show dbs

// Switch to a database
use myDatabase

// Show collections in current database
show collections

// Show current database
db

// Get help
help
```

### 3. CRUD Operations Examples

#### Create (Insert)
```javascript
// Insert a single document
db.users.insertOne({
  name: "Austin Every",
  email: "eveama00@gmail.com",
  role: "admin",
  createdAt: new Date()
})

// Insert multiple documents
db.users.insertMany([
  {name: "John Doe", email: "john@example.com"},
  {name: "Jane Smith", email: "jane@example.com"}
])
```

#### Read (Query)
```javascript
// Find all documents
db.users.find()

// Find with pretty formatting
db.users.find().pretty()

// Find one document
db.users.findOne({email: "eveama00@gmail.com"})

// Find with conditions
db.users.find({role: "admin"})

// Find with multiple conditions
db.users.find({
  role: "admin",
  createdAt: {$gte: new Date("2024-01-01")}
})
```

#### Update
```javascript
// Update one document
db.users.updateOne(
  {email: "eveama00@gmail.com"},
  {$set: {role: "superadmin"}}
)

// Update multiple documents
db.users.updateMany(
  {role: "user"},
  {$set: {status: "active"}}
)

// Increment a field
db.users.updateOne(
  {email: "eveama00@gmail.com"},
  {$inc: {loginCount: 1}}
)
```

#### Delete
```javascript
// Delete one document
db.users.deleteOne({email: "john@example.com"})

// Delete multiple documents
db.users.deleteMany({status: "inactive"})
```

### 4. Advanced Queries

#### Aggregation
```javascript
// Count documents
db.users.countDocuments()

// Group by role
db.users.aggregate([
  {$group: {_id: "$role", count: {$sum: 1}}}
])

// Sort by name
db.users.find().sort({name: 1})

// Limit results
db.users.find().limit(10)

// Skip and limit (pagination)
db.users.find().skip(20).limit(10)
```

#### Indexes
```javascript
// Create an index
db.users.createIndex({email: 1})

// Create a unique index
db.users.createIndex({email: 1}, {unique: true})

// Show all indexes
db.users.getIndexes()

// Drop an index
db.users.dropIndex("email_1")
```

### 5. MongoDB Atlas CLI Commands

The Atlas CLI helps manage your MongoDB Atlas cluster:

```bash
# Login to Atlas
atlas auth login

# List your clusters
atlas cluster list

# Get cluster info
atlas cluster describe Cluster23706

# List databases
atlas dbuser list

# Create a database user
atlas dbuser create --username newuser --password mypassword --role readWrite

# Get connection string
atlas cluster connectionString Cluster23706
```

### 6. Data Import/Export

#### Export data
```bash
# Export collection to JSON
mongoexport --uri "mongodb+srv://eveama00@gmail.com:Amevery9119@cluster23706.ockqq.mongodb.net/" --collection users --out users.json

# Export to CSV
mongoexport --uri "mongodb+srv://eveama00@gmail.com:Amevery9119@cluster23706.ockqq.mongodb.net/" --collection users --type csv --fields name,email,role --out users.csv
```

#### Import data
```bash
# Import from JSON
mongoimport --uri "mongodb+srv://eveama00@gmail.com:Amevery9119@cluster23706.ockqq.mongodb.net/" --collection users --file users.json

# Import from CSV
mongoimport --uri "mongodb+srv://eveama00@gmail.com:Amevery9119@cluster23706.ockqq.mongodb.net/" --collection users --type csv --headerline --file users.csv
```

### 7. Useful Tips

#### Connection Issues
- Make sure your IP is whitelisted in Atlas
- Check your username/password
- Verify the cluster name

#### Performance
- Use indexes for frequently queried fields
- Use `.limit()` to avoid loading large datasets
- Use `.projection()` to select only needed fields

#### Security
- Never share connection strings with passwords
- Use environment variables for sensitive data
- Regularly rotate database passwords

### 8. Exit Commands

```javascript
// Exit MongoDB Shell
exit
quit()

// Or press Ctrl+C
```

## Files Created

1. **`mongodb-demo.js`** - Contains all the example commands
2. **`connect-mongodb.sh`** - Script to easily connect to your database
3. **`MONGODB_CLI_GUIDE.md`** - This comprehensive guide

## Next Steps

1. Try connecting to your database: `./connect-mongodb.sh`
2. Explore the basic commands: `show dbs`, `use myDatabase`, `show collections`
3. Create some test data using the CRUD examples
4. Practice with queries and aggregations
5. Set up indexes for better performance

Happy querying! 🚀 