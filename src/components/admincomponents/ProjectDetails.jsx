import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useParams, useNavigate, Link } from "react-router-dom";
import config from '../../config';

function ProjectDetails() {
    const { id } = useParams(); // Get the project ID from the URL
    const [project, setProject] = useState(null);
    const [projectTranslations, setProjectTranslations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchProjectDetails = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-project/${id}`, { withCredentials: true });
            setProject(response.data);
        } catch (err) {
            setError('Failed to fetch project details');
        } finally {
            setLoading(false);
        }
    }

    const fetchProjectTranslations = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-project-translations/${id}`, { withCredentials: true });
            setProjectTranslations(response.data);
        } catch (err) {
            setError('Failed to fetch project translations');
        }
    }

    useEffect(() => {
        fetchProjectDetails();
        fetchProjectTranslations();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${config.BASE_URL}/api/admin/delete-project/${id}`, { withCredentials: true });
            // Navigate back to the project list or show a success message
            navigate('/admin/projects'); 
        } catch (err) {
            setError('Failed to delete the project');
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
                                    <p>{project?.language || "en"}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Project Title</h2>
                                <div className="detail_item_inner">
                                    <p>{project?.title}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Description</h2>
                                <div className="detail_item_inner">
                                    <p>{project?.description}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Status</h2>
                                <div className="detail_item_inner">
                                    <p>{project?.status}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Space</h2>
                                <div className="detail_item_inner">
                                    <p>{project?.space}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Beds</h2>
                                <div className="detail_item_inner">
                                    <p>{project?.beds}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Baths</h2>
                                <div className="detail_item_inner">
                                    <p>{project?.baths}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <div className="detail_banner_wrap">
                                    <div className="detail_img_grid">

                                        {project.featuredImage ? ( // No .length because it's a string
                                            <div className="detail_img_item">
                                                <h2>Featured Image</h2>
                                                <div className="banner_img_wrap">
                                                <img className="cover" src={`${config.BASE_URL}${project.featuredImage}`} alt="Featured" />
                                                </div>
                                            </div>
                                        ) : (
                                            <p>No image available.</p>
                                        )}
                                
                                    </div>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Gallery Images</h2>
                                <div className="detail_item_inner gallery_inner">
                                <div className="detail_img_grid">
                                    {project.galleryImages && project.galleryImages.length > 0 ? (
                                        project.galleryImages.map((image, index) => (
                                            <div className="detail_img_item" key={index}>
                                                <img className="cover" src={`${config.BASE_URL}${image}`} alt={`Project image ${index}`} />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No images available.</p>
                                    )}
                                </div>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Gallery Title 1</h2>
                                <div className="detail_item_inner">
                                    <p>{project?.galleryTitle1}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Gallery Description 1</h2>
                                <div className="detail_item_inner">
                                    <p>{project?.galleryDesc1}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <div className="detail_banner_wrap">
                                    <div className="detail_img_grid">
                                        {project.galleryBannerImage ? ( // No .length because it's a string
                                            <div className="detail_img_item">
                                                <h2>Gallery Banner Image</h2>
                                                <div className="banner_img_wrap">
                                                <img className="cover" src={`${config.BASE_URL}${project.galleryBannerImage}`} alt="Featured" />
                                                </div>
                                            </div>
                                        ) : (
                                            <p>No image available.</p>
                                        )}
                                
                                    </div>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Gallery Title 2</h2>
                                <div className="detail_item_inner">
                                    <p>{project?.galleryTitle2}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Gallery Description 2</h2>
                                <div className="detail_item_inner">
                                    <p>{project?.galleryDesc2}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Amenities</h2>
                                <div className="detail_item_inner">
                                <div className="repeaterItems">
                                    {project?.amenities.length > 0 && project?.amenities.map((item, key) => (
                                    <div className="singleRepeaterItem">
                                        <div className="repeater_title">
                                            <span><b>Title: </b></span>
                                            <span>{item?.title}</span>
                                        </div>
                                        <p><b>Image: </b></p>
                                        <div className="repeater_images">
                                            {item?.image ? <img className="cover" src={config?.BASE_URL + item?.image} /> : <p>No image available</p>}
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            </div>
                           
                            <div className="detail_project_btn_wrap">
                                <div className="detail_edit_del">
                                    <div className="btn_item">
                                        <button className="detail_btns" onClick={handleDelete}>Delete</button>
                                    </div>

                                    <div className="btn_item">
                                        <Link to={`/admin/update-project/${project._id}`} className="update_detail detail_btns">Edit</Link>
                                    </div>
                                    
                                    <div className="btn_item">
                                        <Link to={`/admin/translate-project/${project._id}`} className="update_detail detail_btns">Translate</Link>
                                    </div>

                                    {projectTranslations.length > 0 && projectTranslations.map((item, key) => (
                                        <div className="btn_item">
                                            <Link to={`/admin/update-project/${item._id}`} className="update_detail detail_btns">Edit Translation in {item?.language}</Link>
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

export default ProjectDetails;
