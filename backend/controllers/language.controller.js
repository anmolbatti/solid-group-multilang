const Language = require('../models/Languages');

exports.addLanguage = async (req, res) => {
    try {
        const { code, name } = req.body;

        const newLanguage = new Language({
            code,
            name,
        });

        await newLanguage.save();

        res.status(200).json({ message: 'Language added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add Language' });
    }
};


exports.languagesList = async (req, res) => {
    try {
        const languages = await Language.find().sort({created_at:-1});
        res.status(200).json(languages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching languages' });
    }
};

exports.getLanguage = async (req, res) => {
    const { id } = req.params;
    try {
        const language = await Language.findById(id);
        if (!language) {
            return res.status(404).json({ message: 'Language not found' });
        }
        res.status(200).json(language);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching language' });
    }
};

exports.letLanguageBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const language = await Language.findOne({slug: slug});
        if (!language) {
            return res.status(404).json({ message: 'language not found' });
        }
        res.status(200).json(language);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching language' });
    }
};

exports.deleteLanguage = async (req, res) => {
    try {
        
        const { id } = req.params;
        
        const language = await Language.findById(id);
        if (!language) {
            return res.status(404).json({ message: 'language not found' });
        }

        const deletedLanguage = await Language.findByIdAndDelete(id);
        if (!deletedLanguage) {
            return res.status(404).json({ message: 'Language not found' });
        }

        res.status(200).json({ message: 'Language deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Language' });
    }
};

exports.updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, name } = req.body;

        const language = await Language.findById(id);
        if (!language) {
            return res.status(404).json({ message: 'language not found' });
        }

        const updatedData = {
            code: code || language.code,
            name: name || language.name,
        };

        const updatedLanguage = await Language.findByIdAndUpdate(id, updatedData, { new: true });        
        res.status(200).json({ message: 'language updated successfully', language: updatedLanguage });

    } catch (error) {
        console.error('Error updating language:', error);
        res.status(500).json({ message: 'Failed to update language' });
    }   
};