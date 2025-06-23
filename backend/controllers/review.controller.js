const Review = require('../models/Review');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

exports.addreview = async (req, res) => {
    try {
        const { title, description, language, parentId, translate } = req.body;
        const featuredImage = req.files['featuredImage'] ? `/images/${req.files['featuredImage'][0].filename}` : '';

        var translations = [];
        if(parentId && translate){
            const parent = await Review.findOne({ _id: parentId });
            if(parent){
                translations = [...parent.translations, { code: language }];
                await Review.findByIdAndUpdate(parentId, {translations}, { new: true });
            }
        }

        const newReview = new Review({
            title,
            description,
            featuredImage,
            language: language ? language : "en",
            parentId: parentId ? parentId : null,
            translations
        });

        await newReview.save();

        res.status(200).json({ message: 'Review added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add Review' });
    }
};


exports.reviewsList = async (req, res) => {
    try {
        const reviews = await Review.find({parentId: null}).sort({created_at:-1});
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews' });
    }
};

exports.reviewsListByLang = async (req, res) => {
    const { lang } = req.params;
    try {
        const reviews = await Review.find({
            language: { $regex: `^${lang}$`, $options: "i" } // Case-insensitive search
        }).sort({created_at:-1});
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews' });
    }
};

exports.getReviewTranslations = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        var translations = await Review.find({parentId: review._id});

        res.status(200).json(translations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching review' });
    }
};

exports.getReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Review' });
    }
};

exports.getReviewBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const review = await Review.findOne({slug: slug});
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Review' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        
        const { id } = req.params;
        
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'review not found' });
        }

        if(review?.parentId !== null){
            const parentReview = await Review.findById(project?.parentId);
            if(parentReview){
                var translations = parentReview?.translations || [];
                if(translations.length > 0){
                    translations = translations.filter((item) => item.code != review.language);
                    await Review.findByIdAndUpdate(review?.parentId, {translations}, { new: true });
                }
            }
        }
        const fs = require('fs');

        if(review?.translations.length > 0){
            review?.translations.map(async (item, key) => {
                var translationreview = await Review.findOne({slug: item?.slug});
                if(translationreview){
                    var deletedTranslation = await Review.findByIdAndDelete(translationreview?._id);
            
                    if(deletedTranslation?.featuredImage){
                        fs.unlink(`./public${deletedTranslation.featuredImage}`, err => {
                            if (err) console.error('Failed to delete image:', deletedTranslation.featuredImage);
                        });
                    }
                }
            });
        }

        const deletedreview = await Review.findByIdAndDelete(id);
        if (!deletedreview) {
            return res.status(404).json({ message: 'review not found' });
        }
        
        if(review?.featuredImage){
            fs.unlink(`./public${review.featuredImage}`, err => {
                if (err) console.error('Failed to delete image:', review.featuredImage);
            });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review' });
    }
};

exports.removeImage = async (req, res) => {
    const { reviewId, imageName } = req.body;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        let updatedData = {};
        
        if (review.featuredImage === imageName) {
            updatedData.featuredImage = null;
        }
        
        const updatedreview = await Review.findByIdAndUpdate(reviewId, { $set: updatedData }, { new: true });
        if (!updatedreview) {
            return res.status(404).json({ message: 'Failed to update Review' });
        }

        const filePath = path.join(__dirname, '..', 'public', imageName);
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting image from filesystem' });
            }
            res.status(200).json({ message: 'Image removed successfully', review: updatedreview });
        });
    } catch (error) {
        console.error('Error removing image:', error);
        res.status(500).json({ message: 'Error removing image', error });
    }
};
exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const featuredImage = req.files['featuredImage'] ? `/images/${req.files['featuredImage'][0].filename}` : review.featuredImage;
        const updatedData = {
            title: title || review.title,
            description: description || review.description,
            featuredImage,
        };

        const updatedReview = await Review.findByIdAndUpdate(id, updatedData, { new: true });        
        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });

    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Failed to update review' });
    }   
};