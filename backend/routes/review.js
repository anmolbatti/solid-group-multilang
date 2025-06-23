require("dotenv").config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const reviewController = require('../controllers/review.controller');
const checkAuth = require('../middleware/auth');
const nodemailer = require('nodemailer');
const axios = require("axios");

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'secureweb16@gmail.com', // Replace with your email
      pass: 'nvbp xohd djtc hzob'    // Replace with your email password
    }
});

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Save to public/images folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

router.post('/add-review', upload.fields([
    { name: 'featuredImage', maxCount: 1 },
]), reviewController.addreview);

router.get('/get-reviews', reviewController.reviewsList);
router.get('/get-reviews/:lang', reviewController.reviewsListByLang);
router.get('/get-review/:id', reviewController.getReview);
router.get('/get-review-translations/:id', reviewController.getReviewTranslations);
router.delete('/delete-review/:id', reviewController.deleteReview);
router.post('/remove-image-review', reviewController.removeImage);

router.put('/update-review/:id', upload.fields([
    { name: 'featuredImage', maxCount: 1 },
]), reviewController.updateReview);


module.exports = router;
