const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');

        const username = 'admin';
        const password = 'admin';

        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            console.log('Admin user already exists');
        } else {
            const newAdmin = new Admin({ username, password });
            await newAdmin.save();
            console.log('Admin user created successfully');
        }

        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
