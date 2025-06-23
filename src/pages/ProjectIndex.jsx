import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"
import Layout from "./Layout"
import StartProject from "../components/StartProject";
import config from '../config';

const ProjectIndex = () => {
    const [projects, setProjects] = useState([]);
    const [translation, setTranslation] = useState();
    const {lang} = useParams();
    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-projects`, { withCredentials: true });
            
            if(response.data){
                setProjects(response.data);
            }

        } catch (err) {
            console.log('Failed to fetch projects');
        } 
    };

    useEffect(() => {
        fetchProjects();
    }, []);
    
    const getTranslatedText = (text) => {
        if(translation){
            return translation[text] || text;
        }else{
            return text;
        }
    }

    return (
        <Layout lang={lang || "en"}>
            <div className="recent-projects-block pb-40 pt-150 sm-pb-90">
                <div className="title-block border-bottom border-gray pb-30">
                    <div className="container">                
                        <div className="left-block">
                            <h6 className="mb-10">Explore Recent Projects</h6>
                            <p>Click to expand the gallery of each and view more.</p>
                        </div>                        
                    </div>    
                </div>
                <div className="projects-blocks showcase-grid-block pb-60 pt-80 sm-pb-130">
                    <div className="container">
                        <div className="grid-blocks d-grid gap-60 d-gap-0">
                            {projects.length > 0 && projects.map((project, index) => (
                                index < 2 && (
                                    <div className={`grid-row d-grid sm-column-2 gap-30 d-gap-80 project-item-${index+1} ${index%2 === 0 ? "" : "sm-grid-odd align-end"}`}>
                                        <div className="grid-block">
                                            <div className="image-block">
                                                <img className="w-100 cover" width="" height="" src={config?.BASE_URL + project?.featuredImage} alt="" />
                                            </div>
                                        </div>
                                        <div className="grid-block">
                                            <div className={`summary-block ${index % 2 === 0 ? "" : "d-right"}`}>
                                                <h2>{project?.title}</h2>
                                                <p>{project?.description}</p>
                                                <Link className="read-more" to={`/project/${project?.slug}`}>View More</Link>
                                            </div>
                                        </div>
                                    </div>                
                                )
                            ))}                            
                        </div>                
                    </div>
                </div>  
                {projects.length >= 2 && (          
                <div className="project-single-block half-overlay-banner-block  color-light d-flex align-end sm-align-center position-relative">
                    <div className="image-block w-100 h-100">
                        <img className="cover" width="" height="" src={config?.BASE_URL + projects[2]?.featuredImage} alt="" />
                    </div>
                    <div className="wrapper-block bg-blur d-flex align-center position-absolute start-0 w-100 sm-h-100">                        
                        <div className="summary-block overflow-hidden">                        
                            <h2 className="pb-20">{projects[2]?.title}</h2>
                            <p>{projects[2]?.description}</p>
                            <Link className="read-more" to={`/project/${projects[2]?.slug}`}>View More</Link>
                        </div>
                    </div>
                </div>  
                )}          
                <div className="projects-blocks showcase-grid-block pt-60 sm-pt-130 pb-30">
                    <div className="container">                
                        <div className="grid-blocks d-grid gap-60 d-gap-0">
                        {projects.length > 0 && projects.map((project, index) => (
                                index > 2 && (
                                    <div className={`grid-row d-grid sm-column-2 gap-30 d-gap-80 project-item-${index+1} ${index%2 === 0 ? "sm-grid-odd align-end" : ""}`}>
                                        <div className="grid-block">
                                            <div className="image-block">
                                                <img className="w-100 cover" width="" height="" src={config?.BASE_URL + project?.featuredImage} alt="" />
                                            </div>
                                        </div>
                                        <div className="grid-block">
                                            <div className={`summary-block ${index % 2 === 0 ? "sm-ms-auto sm-right" : ""}`}>
                                                <h2>{project?.title}</h2>
                                                <p>{project?.description}</p>
                                                <Link className="read-more" to={`/project/${project?.slug}`}>View More</Link>
                                            </div>
                                        </div>
                                    </div>                
                                )
                            ))}                            
                        </div>
                    </div>
                </div>            
            </div>            
            <StartProject getTranslatedText={getTranslatedText} />
        </Layout>
    )
}

export default ProjectIndex
