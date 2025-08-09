require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const classRoutes = require('./routes/class');
const studentRoutes = require('./routes/student');
const attendanceRoutes = require('./routes/attendance');

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/classes', classRoutes);
app.use('/students', studentRoutes);
app.use('/attendance', attendanceRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express + MongoDB Atlas!');
});
