const router = require("express").Router();
const authController = require("../controller/authController");

router.get("/", (req, res) => {
  return res.send("Hello Auth Route");
});
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
