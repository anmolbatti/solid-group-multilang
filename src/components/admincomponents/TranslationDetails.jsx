import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import config from '../../config';
import { Dropdown } from 'primereact/dropdown';

function TranslationDetails() {
    const { id } = useParams(); // Get the project ID from the URL
    const [translations, setTranslations] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        page: '',
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files : value // Set files if they exist, otherwise set value
        }));
    };

    const fetchTranslations = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-translations`, { withCredentials: true });
            setTranslations(response.data);
        } catch (err) {
            setError('Failed to fetch language details');
        } finally {
            setLoading(false);
        }
    }

    const fetchLanguages = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-languages`, { withCredentials: true });

            if (response.data) {
                setLanguages(response.data);
                if (response.data.length > 0) {
                    var selectLanguage = response.data.filter((item) => item.code === "en");
                    if (selectLanguage) {
                        setSelectedLanguage(selectLanguage[0])
                    }
                }
            }

        } catch (err) {
            setError('Failed to fetch languages');
        } finally {
            setLoading(false);
        }
    };

    const addTranslationPage = async (e) => {
        e.preventDefault();
        setSuccessMessage("")
        const data = new FormData();
        data.append('page', formData.page);

        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/add-translation`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            fetchTranslations();
            setSuccessMessage("Translation page added successfully");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            setFormData({
                page: '',
            });

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add translation');
        }
    }

    useEffect(() => {
        fetchTranslations();
        // fetchLanguages();
    }, [id]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="dashboard project_detail_wrap">
            <h1 className="dash_title">Dashboard</h1>
            <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                {/* <div className="switchLanguage">
                        <Dropdown 
                            value={selectedLanguage} 
                            onChange={(e) => setSelectedLanguage(e.value)} 
                            options={languages} 
                            optionLabel="name" 
                            placeholder="Select a language" 
                            className="w-full md:w-14rem" 
                        />
                    </div> */}
            </div>
            <div className="main-section">
                <h2>Translation Pages</h2>
                <div className="projects">
                    <div className="projects-inner">
                        {translations.length > 0 && translations.map((translation, key) => (
                            <>
                                <div className="detail_item">
                                    <h2>Page</h2>
                                    <div className="detail_item_inner">
                                        <p>{translation?.page}</p>
                                    </div>
                                </div>

                                <div className="detail_project_btn_wrap">
                                    <div className="detail_edit_del">
                                        <div className="btn_item">
                                            <Link to={`/admin/update-translation/${translation._id}`} className="update_detail detail_btns">Edit</Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}

                        <div className="addNewTranslation">
                            <h2>Add More Page</h2>
                            <div className="add_field titleField">
                                <h3>Page Slug</h3>
                                <input
                                    type="text"
                                    name="page"
                                    value={formData.page}
                                    onChange={(e) => handleInputChange(e.target)}
                                    required
                                />
                            </div>

                            <button onClick={(e) => addTranslationPage(e)} className="update_detail detail_btns">Add New Translation Page</button>

                        </div>

                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {error && <p className="success-message">{error}</p>}
                    </div>
                </div>


            </div>
        </div>
    );
}

export default TranslationDetails;
