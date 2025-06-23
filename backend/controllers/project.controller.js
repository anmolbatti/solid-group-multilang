const Project = require('../models/Project');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

exports.addProject = async (req, res) => {
    try {
        const { title, description, status, beds, baths, space, galleryTitle1, galleryDesc1, galleryTitle2, galleryDesc2, amenities, language, parentId, translatedSlug, translate } = req.body;
        const featuredImage = req.files['featuredImage'] ? `/images/${req.files['featuredImage'][0].filename}` : '';
        const galleryBannerImage = req.files['galleryBannerImage'] ? `/images/${req.files['galleryBannerImage'][0].filename}` : '';
        const galleryImages = req.files['galleryImages'] ? req.files['galleryImages'].map(file => `/images/${file.filename}`) : [];
        var slug = title.replace(" ", "-").toLowerCase();

        const checkProject = await Project.find({ slug: { $regex: `^${slug}(-[0-9]*)?$` } });
        if (checkProject.length > 0) {
            
            const slugNumbers = checkProject.map(loc => {
                const match = loc.slug.match(/-(\d+)$/);
                return match ? parseInt(match[1], 10) : 1;
            });
    
            const maxNumber = Math.max(...slugNumbers);
            slug = `${slug}-${maxNumber + 1}`;
        }
        
        var translations = [];
        if(parentId && translatedSlug && translate){
            const parent = await Project.findOne({ _id: parentId });
            if(parent){
                translations = [...parent.translations, {code: language, slug: translatedSlug}];
                await Project.findByIdAndUpdate(parentId, {translations}, { new: true });
                slug = translatedSlug;
            }
        }

        const newProject = new Project({
            title,
            description,
            status,
            beds,
            baths,
            space,
            galleryTitle1,
            galleryDesc1,
            galleryTitle2,
            galleryDesc2,
            galleryBannerImage,
            amenities: amenities ? JSON.parse(amenities) : [],
            featuredImage,
            galleryImages,
            slug: slug,
            language,
            parentId: parentId ? parentId : null,
            translations
        });

        await newProject.save();

        res.status(200).json({ message: 'Project added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add project' });
    }
};


exports.projectsList = async (req, res) => {
    try {
        const projects = await Project.find({parentId: null}).sort({created_at:-1}); // Fetch all projects
        // console.log(projects);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects' });
    }
};

exports.projectsListByLang = async (req, res) => {
    const { lang } = req.params;
    try {
        const projects = await Project.find({
            language: { $regex: `^${lang}$`, $options: "i" } // Case-insensitive search
        }).sort({ created_at: -1 });
        // console.log(projects);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects' });
    }
};

exports.getProjectTranslations = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        var translations = await Project.find({parentId: project._id});

        res.status(200).json(translations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project' });
    }
};

exports.getProject = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project' });
    }
};

exports.getProjectBySlug = async (req, res) => {
    const { slug } = req.params; // Get the ID from the URL
    try {
        const project = await Project.findOne({slug: slug}).populate("parentId");
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        
        const { id } = req.params;
        
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if(project?.parentId !== null){
            const projectProject = await Project.findById(project?.parentId);
            if(projectProject){
                var translations = projectProject?.translations || [];
                if(translations.length > 0){
                    translations = translations.filter((item) => item.code != project.language);
                    await Project.findByIdAndUpdate(project?.parentId, {translations}, { new: true });
                }
            }
        }

        const fs = require('fs');

        if(project?.translations.length > 0){
            project?.translations.map(async (item, key) => {
                var translationProject = await Project.findOne({slug: item?.slug});
                if(translationProject){
                    var deletedTranslation = await Project.findByIdAndDelete(translationProject?._id);

                    if(deletedTranslation?.galleryImages?.length > 0){
                        deletedTranslation.galleryImages.forEach(imagePath => {
                            fs.unlink(`./public${imagePath}`, err => {
                                if (err) console.error('Failed to delete image:', imagePath);
                            });
                        });
                    }
            
                    if(deletedTranslation?.featuredImage){
                        fs.unlink(`./public${deletedTranslation.featuredImage}`, err => {
                            if (err) console.error('Failed to delete image:', deletedTranslation.featuredImage);
                        });
                    }
            
                    if(deletedTranslation?.galleryBannerImage){
                        fs.unlink(`./public${deletedTranslation.galleryBannerImage}`, err => {
                            if (err) console.error('Failed to delete image:', deletedTranslation.galleryBannerImage);
                        });
                    }
                }
            });
        }

        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'project not found' }); // If no project is found
        }

        project.galleryImages.forEach(imagePath => {
            fs.unlink(`./public${imagePath}`, err => {
                if (err) console.error('Failed to delete image:', imagePath);
            });
        });

        if(project?.featuredImage){
            fs.unlink(`./public${project.featuredImage}`, err => {
                if (err) console.error('Failed to delete image:', imagePath);
            });
        }

        if(project?.galleryBannerImage){
            fs.unlink(`./public${project.galleryBannerImage}`, err => {
                if (err) console.error('Failed to delete image:', imagePath);
            });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project' });
    }
};

exports.removeImage = async (req, res) => {
    const { projectId, imageName } = req.body;

    try {
        // Find the project first
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if the image is a gallery image, banner image, or featured image
        let updatedData = {};
        
        if (project.galleryImages.includes(imageName)) {
            // Remove image from gallery
            updatedData.galleryImages = project.galleryImages.filter(image => image !== imageName);
        }
        
        if (project.featuredImage === imageName) {
            // If it's the banner image, set it to null or keep the existing value based on your requirements
            updatedData.featuredImage = null; // or ''
        }
        
        if (project.galleryBannerImage === imageName) {
            // If it's the banner image, set it to null or keep the existing value based on your requirements
            updatedData.galleryBannerImage = null; // or ''
        }

        // Update the project with the new data
        const updatedProject = await Project.findByIdAndUpdate(projectId, { $set: updatedData }, { new: true });

        // Check if update was successful
        if (!updatedProject) {
            return res.status(404).json({ message: 'Failed to update Project' });
        }

        // Remove the image from the filesystem
        const filePath = path.join(__dirname, '..', 'public', imageName);
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting image from filesystem' });
            }
            res.status(200).json({ message: 'Image removed successfully', project: updatedProject });
        });
    } catch (error) {
        console.error('Error removing image:', error);
        res.status(500).json({ message: 'Error removing image', error });
    }
};
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, beds, baths, space, galleryTitle1, galleryDesc1, galleryTitle2, galleryDesc2, amenities } = req.body;

        // Retrieve the current project from the database
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Map the new images from the uploaded files
        const newImages = req.files['galleryImages'] ? req.files['galleryImages'].map(file => `/images/${file.filename}`) : [];
        const featuredImage = req.files['featuredImage'] ? `/images/${req.files['featuredImage'][0].filename}` : project.featuredImage;
        const galleryBannerImage = req.files['galleryBannerImage'] ? `/images/${req.files['galleryBannerImage'][0].filename}` : project.galleryBannerImage;

        // Create an updated data object
        const updatedData = {
            title: title || project.title,
            description: description || project.description,
            status: status || project.status,
            beds: beds || project.beds,
            baths: baths || project.baths,
            space : space || project.space,
            galleryTitle1: galleryTitle1 || project.galleryTitle1,
            galleryDesc1: galleryDesc1 || project.galleryDesc1,
            galleryTitle2: galleryTitle2 || project.galleryTitle2,
            galleryDesc2: galleryDesc2 || project.galleryDesc2,
            galleryBannerImage,
            amenities: amenities ? JSON.parse(amenities) : project.amenities,
            featuredImage,
            galleryImages: [...project.galleryImages, ...newImages]
        };

        // Update the project in the database
        const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });
        
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });

    } catch (error) {
        console.error('Error updating Project:', error);
        res.status(500).json({ message: 'Failed to update Project' });
    }   
};

exports.updateProjectFeatured = async (req, res) => {
    try {
        const { featuredProjects, homePageFeatured, detailPageFeatured } = req.body;
        
        if(featuredProjects && featuredProjects.length > 0){

            const multipleProjectIds = await Promise.all(featuredProjects.map(project => project._id));
            
            await Project.updateMany({}, { $set: { isFeatured: false } });
            
            await Project.updateMany(
                { _id: { $in: multipleProjectIds }},
                { $set: { isFeatured: true } }
            );
        }

        if(homePageFeatured){
            await Project.updateMany({}, { $set: { isHomePageFeatured: false } });

            await Project.updateOne(
                { _id: homePageFeatured._id},
                { $set: { isHomePageFeatured: true } }
            );
        }

        if(detailPageFeatured){
            await Project.updateMany({}, { $set: { isDetailPageFeatured: false } });

            await Project.updateOne(
                { _id: detailPageFeatured._id},
                { $set: { isDetailPageFeatured: true } }
            );
        }
        
        res.status(200).json({ message: 'Feature projects updated successfully' });

    } catch (error) {
        console.error('Error updating Project:', error);
        res.status(500).json({ message: 'Failed to set featured projects' });
    }   
};


exports.getFeaturedProjects = async (req, res) => {
    try {
        const featuredProjects = await Project.find({"isFeatured": true});
        const homePageFeatured = await Project.findOne({"isHomePageFeatured": true});
        const detailPageFeatured = await Project.findOne({"isDetailPageFeatured": true});
        
        
        res.status(200).json({ featuredProjects, homePageFeatured, detailPageFeatured });

    } catch (error) {
        console.error('Error updating Project:', error);
        res.status(500).json({ message: 'Failed to set featured projects' });
    }   
};

exports.uploadImage = async (req, res) => {
    const image = req.files['image'] ? `/images/${req.files['image'][0].filename}` : '';
    res.status(200).json({image})
}