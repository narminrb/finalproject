// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));
// app.use(express.json());
// app.use(cookieParser());


// const headerSlideRoutes = require('./routes/headerSlides');
// app.use('/api/header-slides', headerSlideRoutes);

// app.get('/', (req, res) => {
//   res.send('API Running');
// });

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(process.env.PORT, () => {
//       console.log(`Server running on port ${process.env.PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//   });
