import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useParams, useNavigate, Link } from "react-router-dom";
import config from '../../config';

function ReviewDetails() {
    const { id } = useParams(); // Get the project ID from the URL
    const [review, setReview] = useState(null);
    const [reviewTranslations, setReviewTranslations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchReviewDetails = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-review/${id}`, { withCredentials: true });
            setReview(response.data);
        } catch (err) {
            setError('Failed to fetch review details');
        } finally {
            setLoading(false);
        }
    }

    const fetchReviewTranslations = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-review-translations/${id}`, { withCredentials: true });
            setReviewTranslations(response.data);
        } catch (err) {
            setError('Failed to fetch project translations');
        }
    }

    useEffect(() => {
        fetchReviewDetails();
        fetchReviewTranslations();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${config.BASE_URL}/api/admin/delete-review/${id}`, { withCredentials: true });
            // Navigate back to the project list or show a success message
            navigate('/admin/reviews'); 
        } catch (err) {
            setError('Failed to delete the review');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard project_detail_wrap">
                <h1 className="dash_title">Dashboard</h1>
                <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                <div className="main-section">
                    <div className="projects">
                        <div className="projects-inner">
                            <div className="detail_item">
                                <h2>Language</h2>
                                <div className="detail_item_inner">
                                    <p>{review?.language || "en"}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Title</h2>
                                <div className="detail_item_inner">
                                    <p>{review?.title}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Description</h2>
                                <div className="detail_item_inner">
                                    <p>{review?.description}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <div className="detail_banner_wrap">
                                    <div className="detail_img_grid">

                                        {review.featuredImage ? ( // No .length because it's a string
                                            <div className="detail_img_item">
                                                <h2>Featured Image</h2>
                                                <div className="banner_img_wrap">
                                                <img className="cover" src={`${config.BASE_URL}${review.featuredImage}`} alt="Featured" />
                                                </div>
                                            </div>
                                        ) : (
                                            <p>No image available.</p>
                                        )}
                                
                                    </div>
                                </div>
                            </div>
                           
                            <div className="detail_project_btn_wrap">
                                <div className="detail_edit_del">
                                    <div className="btn_item">
                                        <button className="detail_btns" onClick={handleDelete}>Delete</button>
                                    </div>

                                    <div className="btn_item">
                                        <Link to={`/admin/update-review/${review._id}`} className="update_detail detail_btns">Edit</Link>
                                    </div>

                                    <div className="btn_item">
                                        <Link to={`/admin/translate-review/${review._id}`} className="update_detail detail_btns">Translate</Link>
                                    </div>

                                    {reviewTranslations.length > 0 && reviewTranslations.map((item, key) => (
                                        <div className="btn_item">
                                            <Link to={`/admin/update-review/${item._id}`} className="update_detail detail_btns">Edit Translation in {item?.language}</Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default ReviewDetails;
