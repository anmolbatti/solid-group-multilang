const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');
const projectRouter = require('./routes/project');
const reviewRouter = require('./routes/review');
const languageRouter = require('./routes/language');
const translationRouter = require('./routes/translations');
const app = express();
const connectDB = require("./db/config");
require('dotenv').config();

const PORT = process.env.PORT || 5000; 

connectDB();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://192.168.1.2:5173', 'http://localhost:5176'];

app.use(cors({
    origin: (origin, callback) => callback(null, allowedOrigins.includes(origin) || !origin),
    credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.use('/api/admin', adminRouter);
app.use('/api/admin', projectRouter);
app.use('/api/admin', reviewRouter);
app.use('/api/admin', languageRouter);
app.use('/api/admin', translationRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
