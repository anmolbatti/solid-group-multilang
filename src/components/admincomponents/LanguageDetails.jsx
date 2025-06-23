import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useParams, useNavigate, Link } from "react-router-dom";
import config from '../../config';

function LanguageDetails() {
    const { id } = useParams(); // Get the project ID from the URL
    const [language, setLanguage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchReviewDetails = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-language/${id}`, { withCredentials: true });
            setLanguage(response.data);
        } catch (err) {
            setError('Failed to fetch language details');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchReviewDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${config.BASE_URL}/api/admin/delete-language/${id}`, { withCredentials: true });
            // Navigate back to the project list or show a success message
            navigate('/admin/languages'); 
        } catch (err) {
            setError('Failed to delete the language');
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
                                <h2>Name</h2>
                                <div className="detail_item_inner">
                                    <p>{language?.name}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Code</h2>
                                <div className="detail_item_inner">
                                    <p>{language?.code}</p>
                                </div>
                            </div>
                           
                            <div className="detail_project_btn_wrap">
                                <div className="detail_edit_del">
                                    <div className="btn_item">
                                        <button className="detail_btns" onClick={handleDelete}>Delete</button>
                                    </div>
                                    <div className="btn_item">
                                        <Link to={`/admin/update-language/${language._id}`} className="update_detail detail_btns">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default LanguageDetails;
