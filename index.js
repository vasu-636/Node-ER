const express = require('express');
const connectDB = require('./config/db');
const app = express();
const port = 3007;

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Imports (Film Domain Only)
const actorRoutes = require('./routes/actorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const languageRoutes = require('./routes/languageRoutes');
const filmRoutes = require('./routes/filmRoutes');
const filmActorRoutes = require('./routes/filmActorRoutes');
const filmCategoryRoutes = require('./routes/filmCategoryRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const countryRoutes = require('./routes/countryRoutes');

// Mount Routes
app.use('/api/actors', actorRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/film-actors', filmActorRoutes);
app.use('/api/film-categories', filmCategoryRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/country', countryRoutes);


// Healthcheck Route
app.get('/', (req, res) => {
    res.json({ message: "Film Domain API Server Running", status: "OK" });
});

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server Running on: http://localhost:${port}`);
    } else {
        console.log("Error starting server:", err);
    }
});