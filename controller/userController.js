const User = require("../model/user");

const getUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json({ users });
};

module.exports = { getUsers };
