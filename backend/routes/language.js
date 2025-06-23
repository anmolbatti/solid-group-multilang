require("dotenv").config();
const express = require('express');
const languageController = require('../controllers/language.controller');

const router = express.Router();

router.post('/add-language', languageController.addLanguage);
router.get('/get-languages', languageController.languagesList);
router.get('/get-language/:id', languageController.getLanguage);
router.delete('/delete-language/:id', languageController.deleteLanguage);
router.put('/update-language/:id', languageController.updateLanguage);

module.exports = router;
