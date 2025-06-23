import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from '../../config';
import { Dropdown } from 'primereact/dropdown';

function TranslateReview() {
    const { id } = useParams(); // Get the project ID from the URL
    const navigate = useNavigate();
    const [review, setReview] = useState();
    const [featuredImage, setFeaturedImage] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const featuredImageRef = useRef(null);

    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-review/${id}`, { withCredentials: true });
                setReview({
                    title: response.data?.title,
                    description: response.data?.description
                });
            } catch (err) {
                setError('Failed to fetch review details');
            }
        };

        fetchProjectDetails();
    }, [id]);

    const fetchLanguages = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-languages`, { withCredentials: true });
            
            if(response.data){
                setLanguages(response.data);
            }
  
        } catch (err) {
            setError('Failed to fetch languages');
        } finally {
            setLoading(false);
        }
    };
  
    useEffect(() => {
        fetchLanguages();
    }, []);

    const handleRemoveImage = async (imageName) => {
        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/remove-image`, {
                reviewId: review._id,
                imageName
            }, { withCredentials: true });

            if (response.status === 200) {
                setRemoveImages(prev => [...prev, imageName]);

                setReview(prevProject => {
                    return {
                        ...prevProject,
                        featuredImage: prevProject.featuredImage === imageName ? null : prevProject.featuredImage,
                    };
                });

            } else {
                console.error('Failed to remove image');
            }
        } catch (err) {
            console.error('Error removing image:', err);
        }
    };

    const handleFeaturedImageChange = (e) => {
        setFeaturedImage(e.target.files[0]); // Set the featured image
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', review.title);
        formData.append('description', review.description);
        formData.append('parentId', id);
        formData.append('language', selectedLanguage?.code || "en");
        formData.append('translate', true);

        if (featuredImage) {
            formData.append('featuredImage', featuredImage);
        }

        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/add-review/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                const token = localStorage.getItem('token');
                if (token) {
                  navigate('/admin/reviews');
                } else {
                  navigate('/admin/login');
                }
            }
        } catch (err) {
            setError('Failed to update Review');
        }
    }

    return (
        <div className="dashboard update_detail_wrap add_project_main">
            <h1 className="dash_title">Edit Review</h1>
            <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>
            {review ? (
                <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="add-post-form">
                    <div className="update_details_wrap">
                        <div className="form-group">
                            <label>Translation Language</label>
                            <Dropdown 
                                value={selectedLanguage} 
                                onChange={(e) => setSelectedLanguage(e.value)} 
                                options={languages} 
                                optionLabel="name" 
                                placeholder="Select a language" 
                                className="w-full md:w-14rem" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={review.title}
                                onChange={(e) => setReview({ ...review, title: e.target.value })}
                            />
                        </div>

                        <div className="form-group textareaField">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={review.description}
                                onChange={(e) => setReview({ ...review, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="detail_banner_wrap">
                                <div className="detail_img_grid">

                                    <div className="upload_item">
                                        <label>Featured Image</label>
                                        <input type="file" onChange={handleFeaturedImageChange} ref={featuredImageRef} />
                                    </div>
                                    <div className="detail_img_grid">
                                        {review.featuredImage ? (
                                            <div className="detail_img_item">
                                                <div className="banner_img_wrap">
                                                    <img className="cover" src={`${config.BASE_URL}${review.featuredImage}`} alt="Featured" />
                                                </div>
                                                <button className="remove_btn" type="button" onClick={() => handleRemoveImage(review.featuredImage)}>Remove</button>
                                            </div>
                                        ) : (
                                            <p>No image available.</p>
                                        )}
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="update_btn_wrap">
                            <button className="update_btn" type="submit">Translate Review</button>
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

export default TranslateReview;
