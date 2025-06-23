require("dotenv").config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const projectController = require('../controllers/project.controller');
const checkAuth = require('../middleware/auth');
const nodemailer = require('nodemailer');
const axios = require("axios");

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const LIST_ID = process.env.AUDIENCE_ID;
const SERVER_PREFIX = process.env.DATACENTER;

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.hostnet.nl',
  port: 25, // or try 587 if 25 doesn't work
  secure: false, // true for port 465, false for 25/587
  auth: {
    user: 'administration@solidgroup.es',
    pass: 'ADMIN25invoices!' // Replace with actual password
  },
  tls: {
    rejectUnauthorized: false // Optional: disables certificate checks if issues occur
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

router.post('/add-project', upload.fields([
    { name: 'galleryImages', maxCount: 100 },
    { name: 'featuredImage', maxCount: 1 },
    { name: 'galleryBannerImage', maxCount: 1 },
]), projectController.addProject);

// router.post('/add-project', upload.array('images', 10), projectController.addProject);
router.get('/get-projects', projectController.projectsList);
router.get('/get-projects/:lang', projectController.projectsListByLang);
router.get('/get-project/:id', projectController.getProject);
router.get('/get-project-translations/:id', projectController.getProjectTranslations);
router.get('/single-project/:slug', projectController.getProjectBySlug);
router.delete('/delete-project/:id', projectController.deleteProject);
router.post('/remove-image', projectController.removeImage);

router.post('/update-featured-projects', projectController.updateProjectFeatured);
router.get('/get-featured-projects', projectController.getFeaturedProjects);

// Route to update a project
router.post('/upload-image', upload.fields([
    { name: 'image', maxCount: 10 }
]), projectController.uploadImage);

router.put('/update-project/:id', upload.fields([
    { name: 'galleryImages', maxCount: 100 },
    { name: 'featuredImage', maxCount: 1 },
    { name: 'galleryBannerImage', maxCount: 1 },
]), projectController.updateProject);

router.post('/send-email', async (req, res) => {
    const { fname, lname, email, phone, message, services } = req.body;
  
    // Email options
    const mailOptions = {
      from: "administration@solidgroup.es",
      to: "administration@solidgroup.es, anmol.secureweb@gmail.com",
      subject: "New Contact form submission",
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>First Name:</strong> ${fname}</p>
        <p><strong>Last Name:</strong> ${lname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Services:</strong> ${services}</p>
        `
    };
  
    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!', info: info.response });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email', error: error.message });
    }
});


router.post("/subscribe", async (req, res) => {
  const { email, tags } = req.body;
  var lname = '';
  var { name } = req.body;

  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/`;

  var nameChunks = name.replace(/\s+/g, ' ').trim().split(" ");
  if(nameChunks[0]){
    name = nameChunks[0];
  }

  if(nameChunks[1]){
    lname = nameChunks[1];
  }

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
        FNAME: name,
        LNAME: lname
    },
    tags: tags,
  };

  try {
    const response = await axios.post(url, data, {
        headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`,
            "Content-Type": "application/json"
        }
    });

    res.json({ success: true, message: "User subscribed successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, error: error?.response?.data?.detail, errorDetails: error?.response?.data });
  }
});

module.exports = router;
