const Translations = require('../models/Translations');

exports.addTranslation = async (req, res) => {
    try {
        const { translations, page } = req.body;

        const newTranslation = new Translations({
            translations: translations,
            page,
        });

        await newTranslation.save();

        res.status(200).json({ message: 'Translation added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add Translation' });
    }
};


exports.translationList = async (req, res) => {
    try {
        const translations = await Translations.find().sort({created_at:-1});
        res.status(200).json(translations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Translations' });
    }
};

exports.getTranslation = async (req, res) => {
    const { id } = req.params;
    try {
        const translation = await Translations.findById(id);
        if (!translation) {
            return res.status(404).json({ message: 'Translation not found' });
        }
        res.status(200).json(translation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching translation' });
    }
};


exports.getTranslationByPageName = async (req, res) => {
    const { id } = req.params;
    try {
        const translation = await Translations.findOne({page: id});
        if (!translation) {
            return res.status(404).json({ message: 'Translation not found' });
        }
        res.status(200).json(translation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching translation' });
    }
};

exports.deleteTranslation = async (req, res) => {
    try {
        
        const { id } = req.params;
        
        const translation = await Translations.findById(id);
        if (!translation) {
            return res.status(404).json({ message: 'Translation not found' });
        }

        const deletedTranslation = await Translations.findByIdAndDelete(id);
        if (!deletedTranslation) {
            return res.status(404).json({ message: 'Translation not found' });
        }

        res.status(200).json({ message: 'Translation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Translation' });
    }
};

exports.updateTranslation = async (req, res) => {
    try {
        const { id } = req.params;
        const { translations, page } = req.body;

        const translation = await Translations.findById(id);
        if (!translation) {
            return res.status(404).json({ message: 'translations not found' });
        }

        const updatedData = {
            translations: translations ? JSON.parse(translations) : language.translations,
            page: page || language.page,
        };

        const updatedTranslations = await Translations.findByIdAndUpdate(id, updatedData, { new: true });        
        res.status(200).json({ message: 'language updated successfully', translation: updatedTranslations });

    } catch (error) {
        console.error('Error updating Translation:', error);
        res.status(500).json({ message: 'Failed to update Translation' });
    }   
};