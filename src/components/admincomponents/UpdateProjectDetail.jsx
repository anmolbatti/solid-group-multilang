import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from '../../config';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';

function UpdateProjectDetail() {
    const { id } = useParams(); // Get the project ID from the URL
    const navigate = useNavigate();
    const [project, setProject] = useState({
        tags: []
    });
    const [newImages, setNewImages] = useState([]);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [removeImages, setRemoveImages] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const fileInputRef = useRef(null);
    const bannerImageRef = useRef(null);
    const featuredImageRef = useRef(null);

    const [amenities, setAmenities] = useState([
        { title: '', image: null }
    ]);

    // amenities change
    const removeAmenityFields = (index) => {
        const newFields = amenities.filter((field, fieldIndex) => index !== fieldIndex);
        setAmenities(newFields);
    };

    const addAmenityFields = () => {
        setAmenities([...amenities, { title: '', image: null }]);
    };

    const handleAmenityChange = (index, event) => {
        const newFields = amenities.map((field, fieldIndex) => {
            if (index === fieldIndex) {
                return { ...field, [event.target.name]: event.target.value };
            }
            return field;
        });
        setAmenities(newFields);
    };

    const handleAmenityImageChange = (index, event) => {
        const image = event.target.files;
        const newFields = amenities.map((field, fieldIndex) => {
            if (index === fieldIndex) {
                return { ...field, [event.target.name]: image[0] };
            }
            return field;
        });
        setAmenities(newFields);
    };

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-project/${id}`, { withCredentials: true });
                setProject(response.data);
                setAmenities(response?.data?.amenities)
            } catch (err) {
                setError('Failed to fetch project details');
            }
        };

        fetchProjectDetails();
    }, [id]);

    const handleRemoveImage = async (imageName, repeaterName=null, index=0) => {
        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/remove-image`, {
                projectId: project._id,
                imageName
            }, { withCredentials: true });

            if (response.status === 200) {
                // Remove image from the project state and track it for removal
                setRemoveImages(prev => [...prev, imageName]); // Add to removeImages array

                // Update project state
                setProject(prevProject => {
                    const updatedImages = prevProject.galleryImages.filter(image => image !== imageName);
                    return {
                        ...prevProject,
                        galleryImages: updatedImages,
                        // Check if the removed image was the banner or featured image
                        bannerImage: prevProject.galleryBannerImage === imageName ? null : prevProject.galleryBannerImage,
                        featuredImage: prevProject.featuredImage === imageName ? null : prevProject.featuredImage,
                    };
                });

                if(repeaterName && repeaterName === "amenities"){
                    let updatedamenities = amenities;
                    updatedamenities[index]['image'] = null;
                    setAmenities(updatedamenities);
                }

            } else {
                console.error('Failed to remove image');
            }
        } catch (err) {
            console.error('Error removing image:', err);
        }
    };

    const handleNewImageChange = (e) => {
        setNewImages(e.target.files); // Set new images to be uploaded
    };

    const handleFeaturedImageChange = (e) => {
        setFeaturedImage(e.target.files[0]); // Set the featured image
    };

    const handleBannerImageChange = (e) => {
        setBannerImage(e.target.files[0]); // Set the featured image
    };

    const handleImageUpload = async (image) => {
        const formData = new FormData();
        formData.append('image', image);
    
        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/upload-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            return response.data?.image; // Assuming your API returns the image URL
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', project.title);
        formData.append('description', project.description);
        formData.append('status', project.status);
        formData.append('space', project.space);
        formData.append('beds',project.beds);
        formData.append('baths',project.baths);
        formData.append('galleryTitle1',project.galleryTitle1);
        formData.append('galleryDesc1',project.galleryDesc1);
        formData.append('galleryTitle2',project.galleryTitle2);
        formData.append('galleryDesc2',project.galleryDesc2);

        // Send the images to remove, if any
        if (removeImages.length > 0) {
            formData.append('removeImages', JSON.stringify(removeImages));
        }

        // Add new images for gallery
        for (const image of newImages) {
            formData.append('galleryImages', image);
        }

        // Add the featured image if selected
        if (featuredImage) {
            formData.append('featuredImage', featuredImage);
        }

        if (bannerImage) {
            formData.append('galleryBannerImage', bannerImage);
        }

        if(amenities.length > 0) {
            var updatedAmenities = [];
            await Promise.all(amenities.map(async (item, index) => {
                if(item?.image){
                    if(typeof item?.image == "object"){
                        var imageData = await handleImageUpload(item?.image);
                        updatedAmenities.push({title: item.title, image: imageData});
                    }else{
                        updatedAmenities.push({title: item.title, image: item?.image});
                    }
                }else{
                    updatedAmenities.push({title: item.title, image: null});
                }
            }));
            formData.append('amenities', JSON.stringify(updatedAmenities));
        }

        try {
            const response = await axios.put(`${config.BASE_URL}/api/admin/update-project/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            // Update the project state with the response data
            setProject(response.data.project); // Assuming the response includes the updated project
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear the file input for new images
            }

            if (featuredImageRef.current) {
                featuredImageRef.current.value = ''; // Clear the featured image input
            }

            if (bannerImageRef.current) {
                bannerImageRef.current.value = ''; // Clear the featured image input
            }

            setFeaturedImage(null);
            setBannerImage(null);
            setSuccessMessage('Project updated successfully!');
        } catch (err) {
            setError('Failed to update project');
        }
    }

    // console.log("team: ", team);

    return (
        <div className="dashboard update_detail_wrap add_project_main">
            <h1 className="dash_title">Edit {project?.parentId !== null ? "Project Translation" : "Project"}</h1>
            <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>
            {project ? (
                <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="add-post-form">
                    <div className="update_details_wrap">
                        <div className="form-group">
                            <label>Location Title</label>
                            <input
                                type="text"
                                value={project.title}
                                onChange={(e) => setProject({ ...project, title: e.target.value })}
                            />
                        </div>

                        <div className="form-group textareaField">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={project.description}
                                onChange={(e) => setProject({ ...project, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <input
                                type="text"
                                value={project.status}
                                onChange={(e) => setProject({ ...project, status: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Space</label>
                            <input
                                type="text"
                                value={project.space}
                                onChange={(e) => setProject({ ...project, space: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Beds</label>
                            <input
                                type="text"
                                value={project.beds}
                                onChange={(e) => setProject({ ...project, beds: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Baths</label>
                            <input
                                type="text"
                                value={project.baths}
                                onChange={(e) => setProject({ ...project, baths: e.target.value })}
                            />
                        </div>

                        <div className="form-group">

                            <div className="form-group">
                                <label>Upload Gallery Images</label>
                                <input type="file" multiple onChange={handleNewImageChange} ref={fileInputRef} />
                            </div>
                            <div className="detail_item_inner gallery_inner">
                                <div className="detail_img_grid">
                                    {project?.galleryImages && project.galleryImages.map((image, index) => (
                                        <div className="detail_image_item" key={index}>
                                            <div className="detail_img_item">
                                                <img className="cover" src={`${config.BASE_URL}${image}`} alt={`Project ${index}`} />
                                            </div>
                                            <button className="remove_btn" type="button" onClick={() => handleRemoveImage(image)}>Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="detail_banner_wrap">
                                <div className="detail_img_grid">

                                    <div className="upload_item">
                                        <label>Featured Image</label>
                                        <input type="file" onChange={handleFeaturedImageChange} ref={featuredImageRef} />
                                    </div>
                                    <div className="detail_img_grid">
                                        {project.featuredImage ? (
                                            <div className="detail_img_item">
                                                <div className="banner_img_wrap">
                                                    <img className="cover" src={`${config.BASE_URL}${project.featuredImage}`} alt="Featured" />
                                                </div>
                                                <button className="remove_btn" type="button" onClick={() => handleRemoveImage(project.featuredImage)}>Remove</button>
                                            </div>
                                        ) : (
                                            <p>No image available.</p>
                                        )}
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="form-group">
                            <label>Gallery Title 1</label>
                            <input
                                type="text"
                                value={project.galleryTitle1}
                                onChange={(e) => setProject({ ...project, galleryTitle1: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Gallery Description 1</label>
                            <input
                                type="text"
                                value={project.galleryDesc1}
                                onChange={(e) => setProject({ ...project, galleryDesc1: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Gallery Title 2</label>
                            <input
                                type="text"
                                value={project.galleryTitle2}
                                onChange={(e) => setProject({ ...project, galleryTitle2: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Gallery Description 2</label>
                            <input
                                type="text"
                                value={project.galleryDesc2}
                                onChange={(e) => setProject({ ...project, galleryDesc2: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <div className="detail_banner_wrap">
                                <div className="detail_img_grid">

                                    <div className="upload_item">
                                        <label>Gallery Banner Image</label>
                                        <input type="file" onChange={handleBannerImageChange} ref={bannerImageRef} />
                                    </div>
                                    <div className="detail_img_grid">
                                        {project.galleryBannerImage ? (
                                            <div className="detail_img_item">
                                                <div className="banner_img_wrap">
                                                    <img className="cover" src={`${config.BASE_URL}${project.galleryBannerImage}`} alt="Featured" />
                                                </div>
                                                <button className="remove_btn" type="button" onClick={() => handleRemoveImage(project.galleryBannerImage)}>Remove</button>
                                            </div>
                                        ) : (
                                            <p>No image available.</p>
                                        )}
                                    </div>

                                </div>

                            </div>
                        </div>

                        <h2>Add Amenities</h2>
                            {amenities.length > 0 && amenities.map((field, index) => (
                                <div key={index} className="addItineraryFields">
                                <div className="add_field">
                                    <h2>Amenity Title</h2>
                                    <input
                                        name="title"
                                        type="text"
                                        value={field.title}
                                        placeholder="Title"
                                        onChange={(event) => handleAmenityChange(index, event)}
                                    />
                                </div>

                                <div className="add_field">
                                    <h2>Amenity Image</h2>
                                    <div className="form-group">
                                        <div className="file-upload">
                                            <input
                                                type="file" 
                                                className="form-control"
                                                name="image"
                                                onChange={(event) => handleAmenityImageChange(index, event)}
                                                multiple
                                            />
                                            <i className="fa fa-camera i-pic-upload"></i>
                                        </div>
                                    </div>

                                    {field?.image && (
                                        <div className="detail_item_inner gallery_inner">
                                            <div className="detail_img_grid">
                                                <div className="detail_image_item">
                                                    <div className="detail_img_item">
                                                        <div className="banner_img_wrap">
                                                            <img className="cover" src={`${config.BASE_URL}${field?.image}`} alt="Featured" />
                                                        </div>
                                                    </div>
                                                    <button className="remove_btn" type="button" onClick={() => handleRemoveImage(field?.image, 'amenities', index)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button type="button" onClick={() => removeAmenityFields(index)}>
                                    Remove
                                </button>
                                </div>
                            ))}

                            <button type="button" onClick={addAmenityFields}>Add More Amenity</button>

                        <div className="update_btn_wrap">
                            <button className="update_btn" type="submit">Update Project</button>
                        </div>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </form>
            ) : (
                <h5>Project not found!</h5>
            )}
        </div>
    );
}

export default UpdateProjectDetail;
