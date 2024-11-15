const { getUsers } = require('../models/userModel');  // Importing user model functions

// Fetch all users
const fetchAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = { fetchAllUsers };
