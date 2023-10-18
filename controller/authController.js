const User = require("../model/user");
const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  let errors = [];
  if (!firstname) errors.push({ firstname: "Firstname is required." });
  if (!lastname) errors.push({ lastname: "Lastname is required." });
  if (!email) errors.push({ email: "Email is required." });
  if (!password) errors.push({ password: "Password is required" });
  if (errors.length > 0) return res.status(400).json({ errors });

  const matchEmail = await User.findOne({ email }).exec();
  if (matchEmail) {
    return res.status(409).json({ message: "Email already exists." });
  } else {
    try {
      const user = await User.create({
        firstname,
        lastname,
        password,
        email,
      });
      return res.status(201).json({ user });
    } catch (err) {
      throw err;
    }
  }
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   let errors = [];
//   if (!email) errors.push({ email: "Email is required!" });
//   if (!password) errors.push({ password: "Password is required!" });
//   if (errors.length > 0) return res.status(400).json({ errors });

//   const matchEmail = await User.findOne({ email }).exec();
//   if (!matchEmail) res.status(401).json({ message: "Email address does not exist." });
//   else {
//     const matchPassword = password === matchEmail.password;
//     if (matchPassword)
//       return res.status(200).json({ status: 200, message: "Login Successful" });
//     return res.status(401).json({ message: "Invalid email or password." });
//   }
// };

const login = async (req, res) => {
  const { email, password } = req.body;
  let errors = [];
  if (!email) errors.push({ email: "Email is required!" });
  if (!password) errors.push({ password: "Password is required!" });
  if (errors.length > 0) return res.status(400).json({ errors });
  else {
    return res.status(200).json({
      status: 200,
      message: "Login Successful",
      user: {
        username: email.split("@")[0],
        email,
        password,
      },
    });
  }
};

module.exports = { login, register };
