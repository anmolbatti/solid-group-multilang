import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import config from '../../config';

function ReviewsList() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-reviews`, { withCredentials: true });
            
            if(response.data){
                setReviews(response.data);
            }

        } catch (err) {
            setError('Failed to fetch reviews');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
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
                                    <Link to="/admin/add-review">Add Review</Link>
                                    </div>
                                </header>
                                <table className="projects-table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Description</th>
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
                                            reviews.map((review, index) => ( 
                                                review?.parentId === null && (
                                                    <tr key={review._id}>
                                                        <td><p>{review.title}</p></td>
                                                        <td><p>{review.description}</p></td>
                                                        <td>
                                                            <Link to={`/admin/review/${review._id}`} className="view_detail">View Details</Link>
                                                        </td>
                                                    </tr>
                                                )
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

export default ReviewsList;
