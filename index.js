require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3007;

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Imports
const authRoutes = require('./routes/authRoutes');
const actorRoutes = require('./routes/actorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const languageRoutes = require('./routes/languageRoutes');
const filmRoutes = require('./routes/filmRoutes');
const filmActorRoutes = require('./routes/filmActorRoutes');
const filmCategoryRoutes = require('./routes/filmCategoryRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

const countryRoutes = require('./routes/countryRoutes');
const cityRoutes = require('./routes/cityRoutes');
const addressRoutes = require('./routes/addressRoutes');
const storeRoutes = require('./routes/storeRoutes');
const staffRoutes = require('./routes/staffRoutes');
const customerRoutes = require('./routes/customerRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

// Auth Routes
app.use('/api/auth', authRoutes);

// Film Domain Routes
app.use('/api/actors', actorRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/film-actors', filmActorRoutes);
app.use('/api/film-categories', filmCategoryRoutes);
app.use('/api/inventories', inventoryRoutes);

// Operations, Location & Customer Domain Routes
app.use('/api/countries', countryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/rentals', rentalRoutes);

// Healthcheck Route
app.get('/', (req, res) => {
    res.json({ message: "Sakila ER Diagram Full API Server Running (Payment Excluded)", status: "OK" });
});

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server Running on: http://localhost:${port}`);
    } else {
        console.log("Error starting server:", err);
    }
});