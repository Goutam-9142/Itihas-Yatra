const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Database connection (Simple setup with error handling)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/itihasyatra', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log('MongoDB Connection Error:', err));

// EJS Setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout'); // Use views/layout.ejs as common template

// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
}));

// Static Folders
app.use(express.static(path.join(__dirname, 'public')));

// Global Variables for views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Import Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const journeyRoutes = require('./routes/journey');

// Use Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/journey', journeyRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});