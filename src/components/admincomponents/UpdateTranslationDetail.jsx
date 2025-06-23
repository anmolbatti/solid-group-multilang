import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from '../../config';
import { Dropdown } from 'primereact/dropdown';

function UpdateTranslationDetail() {
    const { id } = useParams(); // Get the project ID from the URL
    const navigate = useNavigate();
    const [translation, setTranslation] = useState();
    const [selectedTranslation, setSelectedTranslation] = useState();
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [newText, setNewText] = useState([
        { original: '', translated: '' }
    ]);

    // amenities change
    const removeTextFields = (index) => {
        const newFields = newText.filter((field, fieldIndex) => index !== fieldIndex);
        setNewText(newFields);
    };

    const addTextFields = () => {
        setNewText([...newText, { original: '', translated: '' }]);
    };

    const handleTextChange = (index, event) => {
        const newFields = newText.map((field, fieldIndex) => {
            if (index === fieldIndex) {
                return { ...field, [event.target.name]: event.target.value };
            }
            return field;
        });
        setNewText(newFields);
    };

    useEffect(() => {
        const fetchLanguageDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-translation/${id}`, { withCredentials: true });
                setTranslation(response.data);
            } catch (err) {
                setError('Failed to fetch translation details');
            }
        };

        const fetchLanguages = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-languages`, { withCredentials: true });

                if (response.data) {
                    setLanguages(response.data);
                    
                    if (response.data.length > 0) {
                        var selectLanguage = response.data.filter((item) => item.code === "en");
                        
                        if (selectLanguage.length > 0) {
                            setSelectedLanguage(selectLanguage[0])
                        }else{
                            setSelectedLanguage(response.data[0])
                        }
                    }
                }

            } catch (err) {
                setError('Failed to fetch languages');
            }
        };

        fetchLanguageDetails();
        fetchLanguages();
    }, [id]);

    useEffect(() => {
        if (selectedLanguage && translation?.translations.length > 0) {
            var getTranslation = translation?.translations[0][selectedLanguage?.code];
            setSelectedTranslation(getTranslation);
        }
    }, [selectedLanguage]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if(!selectedLanguage){
            alert("Please select language");
            return;
        }

        const formData = new FormData();
        var translations = [];
        if (selectedTranslation && translation?.translations?.length > 0) {
            translations = [{ ...translation?.translations[0], [selectedLanguage?.code]: selectedTranslation }];
        }
        
        if(newText.length > 0){
            newText.map((item, key) => {
                if(item?.original !== ""){
                    if(translations[0]?.[selectedLanguage?.code]){
                        translations[0][selectedLanguage?.code][item?.original] = item?.translated;
                    }else{
                        translations[0] = {...translation?.translations[0], [selectedLanguage?.code] : {[item?.original]: item?.translated}}
                    }
                }
            });
        }

        formData.append('page', translation.page);
        formData.append('translations', JSON.stringify(translations));

        try {
            const response = await axios.put(`${config.BASE_URL}/api/admin/update-translation/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            setTranslation(response.data.translation);
            setSuccessMessage('translation updated successfully!');

            setNewText([
                { original: '', translated: '' }
            ]);

            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);

        } catch (err) {
            setError('Failed to update translation');
        }
    }

    return (
        <div className="dashboard update_detail_wrap add_project_main">
            <h1 className="dash_title">Edit Translation</h1>
            <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>
            <div className="switchLanguage">
                <Dropdown
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.value)}
                    options={languages}
                    optionLabel="name"
                    placeholder="Select a language"
                    className="w-full md:w-14rem"
                />
            </div>
            {translation ? (
                <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="add-post-form">
                    <div className="update_details_wrap">
                        {selectedTranslation && Object.keys(selectedTranslation).map(key => (
                            <div className="form-group">
                                <label>{key}</label>
                                <input
                                    type="text"
                                    value={selectedTranslation[key]}
                                    onChange={(e) => setSelectedTranslation({ ...selectedTranslation, [key]: e.target.value })}
                                />
                            </div>
                        ))}

                        <div className="form-group">
                            <label>Add Translation</label>
                            {newText.map((field, index) => (
                                <div key={index} className="addItineraryFields">
                                    <div className="add_field">
                                        <h2>English Text</h2>
                                        <input
                                            name="original"
                                            type="text"
                                            value={field.original}
                                            placeholder="English Text"
                                            onChange={(event) => handleTextChange(index, event)}
                                        />
                                    </div>

                                    <div className="add_field">
                                        <h2>Translated Text</h2>
                                        <input
                                            name="translated"
                                            type="text"
                                            value={field.translated}
                                            placeholder="Translated Text"
                                            onChange={(event) => handleTextChange(index, event)}
                                        />
                                    </div>

                                    <button type="button" onClick={() => removeTextFields(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}

                            <button type="button" onClick={addTextFields}>Add More Text</button>
                        </div>

                        <div className="update_btn_wrap">
                            <button className="update_btn" type="submit">Update translation</button>
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

export default UpdateTranslationDetail;
