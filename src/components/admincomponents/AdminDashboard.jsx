import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from '../../../src/config';

function AdminDashboard({ onLogout }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-projects`, { withCredentials: true });
                setProjects(response.data); // Set the fetched projects to state
            } catch (err) {
                setError('Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            <div className="dashboard">
                    <h1 className="dash_title">Dashboard</h1>
                    <div className="main-section_dashboard">
                        <div class="content">
                            <div class="cards">
                                <div class="card red">
                                    <i class="fas fa-folder-open">
                                    </i>
                                    <div class="number">
                                        {projects.length}
                                    </div>
                                    <div class="label">
                                        Total Projects
                                    </div>
                                </div>
                            </div>
                            <div class="user-info">
                                {projects.map((project, index) => (
                                    project?.parentId === null && (
                                        <div className="details" key={project._id}>
                                            <div className="name">
                                                {project.title}
                                            </div>
                                            <div className="tweet">
                                                {project.brandDirection}
                                            </div>
                                        </div>
                                    )
                                ))}
                                <i class="fab fa-twitter">
                                </i>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    );
}

export default AdminDashboard;
