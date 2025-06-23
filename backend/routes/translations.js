require("dotenv").config();
const express = require('express');
const translationController = require('../controllers/translation.controller');

const router = express.Router();

router.post('/add-translation', translationController.addTranslation);
router.get('/get-translations', translationController.translationList);
router.get('/get-translation/:id', translationController.getTranslation);
router.get('/get-translation-page/:id', translationController.getTranslationByPageName);
router.delete('/delete-translation/:id', translationController.deleteTranslation);
router.put('/update-translation/:id', translationController.updateTranslation);

module.exports = router;
