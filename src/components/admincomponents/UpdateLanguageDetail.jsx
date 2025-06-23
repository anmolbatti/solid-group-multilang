import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from '../../config';

function UpdateLanguageDetail() {
    const { id } = useParams(); // Get the project ID from the URL
    const navigate = useNavigate();
    const [language, setLanguage] = useState();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchLanguageDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-language/${id}`, { withCredentials: true });
                setLanguage(response.data);
            } catch (err) {
                setError('Failed to fetch language details');
            }
        };

        fetchLanguageDetails();
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', language.name);
        formData.append('code', language.code);

        try {
            const response = await axios.put(`${config.BASE_URL}/api/admin/update-language/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            setLanguage(response.data.language);
            setSuccessMessage('Language updated successfully!');
        } catch (err) {
            setError('Failed to update Language');
        }
    }

    return (
        <div className="dashboard update_detail_wrap add_project_main">
            <h1 className="dash_title">Edit language</h1>
            <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>
            {language ? (
                <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="add-post-form">
                    <div className="update_details_wrap">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={language.name}
                                onChange={(e) => setLanguage({ ...language, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Code</label>
                            <input
                                type="text"
                                value={language.code}
                                onChange={(e) => setLanguage({ ...language, code: e.target.value })}
                            />
                        </div>

                        <div className="update_btn_wrap">
                            <button className="update_btn" type="submit">Update language</button>
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

export default UpdateLanguageDetail;
