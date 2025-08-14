// In-memory storage for testing (replace with MongoDB in production)
const users = [];
let userIdCounter = 1;

// Helper function to find user by email
const findUserByEmail = (email) => {
  return users.find(user => user.email === email.toLowerCase());
};

// Helper function to find user by ID
const findUserById = (id) => {
  return users.find(user => user._id === id);
};

// Helper function to get public profile
const getPublicProfile = (user) => {
  const { password, ...publicUser } = user;
  return publicUser;
};

// Helper function to add user
const addUser = (user) => {
  user._id = userIdCounter++;
  users.push(user);
  return user;
};

// Helper function to update user
const updateUser = (userId, updates) => {
  const userIndex = users.findIndex(user => user._id === userId);
  if (userIndex === -1) return null;
  
  users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date() };
  return users[userIndex];
};

// Helper function to get all users
const getAllUsers = () => {
  return users.map(user => getPublicProfile(user));
};

module.exports = {
  users,
  findUserByEmail,
  findUserById,
  getPublicProfile,
  addUser,
  updateUser,
  getAllUsers
}; 