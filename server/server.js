const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/booking');
const EventRouter = require("./routes/Event");
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const authenticateJWT = require('./middleware/authenticateJWT'); 
const feedbackRoutes = require('./routes/feedbackRoutes');


const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 2000;

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    credentials: true, // Allow cookies and credentials
}));
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use('/Event', EventRouter); 
app.use('/api/admin', adminRoutes);
app.use('/booking', bookingRoutes);
app.use('/user', userRoutes);
app.use('/feedback',feedbackRoutes)


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
