// import User from '../schema/User';
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');






// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     user = new User({ name, email, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Trying to log in with:", email);

//   try {
//     const user = await User.findOne({ email });
//     console.log("User found in DB:", user);

//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await user.matchPassword(password);
//     console.log("Password match?", isMatch);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const payload = {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res
//       .cookie('token', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: 24 * 60 * 60 * 1000,
//       })
//       .json({ message: 'Login successful', user: payload });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });




// router.post('/logout', (req, res) => {
//   res
//     .cookie('token', '', {
//       httpOnly: true,
//       expires: new Date(0),
//       sameSite: 'strict',
//       secure: process.env.NODE_ENV === 'production',
//     })
//     .json({ message: 'Logged out' });
// });

// module.exports = router;
