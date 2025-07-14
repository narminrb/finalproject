const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

// Protected route example
router.get('/', protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}`, user: req.user });
});

module.exports = router;
