import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import config from '../../config';

function LanguageList() {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    return (
        <>
            <div className="dashboard">
                    <h1 className="dash_title">Dashboard</h1>
                    <div className="main-section">
                        <div className="projects">
                            <div className="projects-inner">
                                <header className="projects-header">
                                    <div className="add_project">
                                    <Link to="/admin/add-language">Add Language</Link>
                                    </div>
                                </header>
                                <table className="projects-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Code</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="4">Loading...</td>
                                            </tr>
                                        ) : error ? (
                                            <tr>
                                                <td colSpan="4">{error}</td>
                                            </tr>
                                        ) : (
                                            languages.map((language, index) => ( 
                                                <tr key={language._id}>
                                                    <td><p>{language.name}</p></td>
                                                    <td><p>{language.code}</p></td>
                                                    <td>
                                                        <Link to={`/admin/language/${language._id}`} className="view_detail">View Details</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default LanguageList;
