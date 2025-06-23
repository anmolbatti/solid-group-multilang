import React, { useEffect, useState } from "react";
import Layout from "./Layout"
import { Link, useParams } from "react-router-dom"
import Reviews from "../components/Reviews"
import StartProject from "../components/StartProject";
import siteLogo from '../assets/images/logo.svg'
import homeBanner from '../assets/images/solidHomeBanner.jpg'
import designBuild from '../assets/images/design-build.png'
import renovations from '../assets/images/renovations.png'
import tabImg1 from '../assets/images/amenities.jpg'
import tabImg2 from '../assets/images/home-banner.jpg'
import tabImg3 from '../assets/images/project-banner.jpg'
import tabImg4 from '../assets/images/amenities.jpg'
import tabImg5 from '../assets/images/whySolidBanner.jpg'

import { GoArrowUpRight } from "react-icons/go";
import config from '../config';
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
 
const Home = () => {
    const [projects, setProjects] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [translations, setTranslations] = useState();
    const [translation, setTranslation] = useState();
    const { lang } = useParams();

    const fetchProjects = async () => {
        try {
            console.log("BASE_URL:", config.BASE_URL);
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-projects/${lang || "en"}`, { withCredentials: true });

            if (response.data) {
                // console.log(response.data);
                setProjects(response.data);
            }

        } catch (err) {
            console.log('Failed to fetch projects');
        }
    };

    const fetchreviews = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-reviews/${lang || "en"}`, { withCredentials: true });

            if (response.data) {
                setReviews(response.data);
            }

        } catch (err) {
            console.log('Failed to fetch reviews');
        }
    };

    const fetchTranslationsDetails = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-translation-page/home`, { withCredentials: true });
            setTranslations(response.data);
        } catch (err) {
            console.log('Failed to fetch translation details');
        }
    };

    useEffect(() => {
        if(translations){
            if(translations?.translations.length > 0){
                var langCode = lang || "en";
                if(translations?.translations[0][langCode]){
                    setTranslation(translations?.translations[0][langCode]);
                }else{
                    setTranslation(translations?.translations[0]["en"]);
                }
            }
        }
    }, [translations]);

    const getTranslatedText = (text) => {
        if(translation){
            return translation[text] || text;
        }else{
            return text;
        }
    }

    useEffect(() => {
        fetchProjects();
        fetchreviews();
        fetchTranslationsDetails();
    }, []);

    useEffect(() => {
        fetchProjects();
        fetchreviews();
        fetchTranslationsDetails();
    }, [lang]);

    const items = [
        { title: "Nordic-inspired architecture with a Mediterranean influence", image: tabImg5 },
        { title: "Emphasis on quality, sustainability, and timeless aesthetics", image: tabImg5 },
        { title: "Turnkey design and build services", image: tabImg5 },
        { title: "Highly personalized client experience", image: tabImg5 }
    ];
    const [selectedImage, setSelectedImage] = useState(items[0].image);
    const filteredProjectsCintainerTwo = projects.filter((_, index) => index > 2 && index <= 4);
    // const filteredProjectsCintainerTwo = projects.filter((_, index) => index > 2 && index <= 4);
    return (
        <Layout lang={lang || "en"} isHomePage={true}>
            <div className="home-banner-block hero-banner-block color-light d-flex justify-center align-end full-screen top-overlay bottom-overlay position-relative overflow-hidden">
                <img className="cover" width="" height="" src={homeBanner} alt="" />
                <div className="summary-block summary-block-1 d-grid place-center gap-20 center position-absolute z-index-1 px-20 w-100 pb-150">
                    <img className="hero-logo" width="" height="" src={siteLogo} alt="" />
                    <h2 className="mb-0">{getTranslatedText("Refined and elevated properties in Marbella’s most sought-after areas")}</h2>
                </div>
                {/* <div className="summary-block summary-block-2 right uppercase position-absolute z-index-1 px-20 sm-px-80 w-100 pb-40">
                {getTranslatedText("New Modern Villa Build · On The Golden Mile")} | <Link className="d-inline-flex align-center gap-10" to="/">{getTranslatedText("View Now")} <GoArrowUpRight /></Link>
                </div> */}
            </div>
            <div className="text-with-list-block color-light bg-deep-gray py-130 d-py-100">
                <div className="container">
                    <div className="grid-blocks d-grid gap-10 d-gap-70">
                        <div className="grid-block left-block">
                            <div className="summary-block">
                                <h2>{getTranslatedText("Timeless, value-driving design and building techniques meets Spain’s most exclusive real estate opportunities")}</h2>
                                <Link className="read-more m-hide" to="/about">{getTranslatedText("About")}</Link>
                            </div>
                        </div>
                        <div className="grid-block right-block">
                            <div className="summary-block">
                                <div className="text">
                                    {getTranslatedText("Solid Group is a boutique design and build firm specializing in custom luxury villas across the Costa del Sol and select international destinations. Our architectural approach is grounded in the principles of Nordic design—clean lines, natural textures, and functional elegance—brought to life with a Mediterranean sensibility.")}
                                </div>
                            </div>
                            <div className="button-block d-hide pt-40">
                                <Link className="read-more" to="/about">{getTranslatedText("About")}</Link>
                            </div>
                            {/* <div className="list-blocks d-grid gap-20">
                                <div className="list-block d-flex xs-gap-20 gap-30">
                                    <div className="image-block">
                                        <img width="" height="" className="cover" src={designBuild} alt="" />
                                    </div>
                                    <div className="summary-block">
                                        <h6>{getTranslatedText("Design & Bulid")}</h6>
                                        <p>{getTranslatedText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}</p>
                                    </div>
                                </div>
                                <div className="list-block d-flex xs-gap-20 gap-30">
                                    <div className="image-block">
                                        <img width="" height="" className="cover" src={renovations} alt="" />
                                    </div>
                                    <div className="summary-block">
                                        <h6>{getTranslatedText("Renovations")}</h6>
                                        <p>{getTranslatedText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="recent-projects-block pt-90 pb-60 sm-pb-90">
            {projects?.length > 0 && (
                <div className="container">
                    <div className="title-block d-flex justify-between pb-60">
                        <div className="left-block">
                            <h6 className="mb-10">{getTranslatedText("Explore Recent Projects")}</h6>
                            <p>{getTranslatedText("Click to expand the gallery of each and view more.")}</p>
                        </div>
                        <div className="right-block">
                            <Link className="button button-primary" to="/all-projects">{getTranslatedText("View All")}</Link>
                        </div>
                    </div>
                    <div className="projects-blocks showcase-grid-block pb-60 sm-pb-130">
                        <div className="grid-blocks d-grid gap-60 d-gap-0">
                            {projects.length > 0 && projects.map((project, index) => (
                                index < 2 && (
                                    <div className={`grid-row d-grid sm-column-2 gap-30 d-gap-80 project-item-${index+1} ${index % 2 === 0 ? "" : "sm-grid-odd align-end"}`}>
                                        <div className="grid-block">
                                            <div className="image-block">
                                                <img className="w-100 cover" width="" height="" src={config?.BASE_URL + project?.featuredImage} alt="" />
                                            </div>
                                        </div>
                                        <div className="grid-block">
                                            <div className={`summary-block ${index % 2 === 0 ? "" : "sm-ms-auto sm-right"}`}>
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
                )}
                {projects.length >= 2 && (
                    <div className="project-single-block half-overlay-banner-block color-light d-flex align-end sm-align-center position-relative">
                        <div className="image-block w-100 h-100">
                            <img className="cover" width="" height="" src={config?.BASE_URL + projects[2]?.featuredImage} alt="" />
                        </div>
                        <div className="wrapper-block bg-blur d-flex align-center position-absolute start-0 w-100 sm-h-100">                            
                            <div className="summary-block overflow-hidden">                                
                                <h2 className="sm-pb-20">{projects[2]?.title}</h2>
                                <p>{projects[2]?.description}</p>
                                <Link className="read-more" to={`/project/${projects[2]?.slug}`}>{getTranslatedText("View More")}</Link>                                
                            </div>                            
                        </div>
                    </div>
                )}
                {filteredProjectsCintainerTwo.length > 0 && (
                <div className="container">
                    <div className="projects-blocks showcase-grid-block pt-60 sm-pt-130 sm-pb-50">
                        <div className="grid-blocks d-grid gap-60 d-gap-0">
                            {projects.length > 0 && projects.map((project, index) => (
                                (index > 2 && index <= 4) && (
                                    <div className={`grid-row d-grid sm-column-2 gap-30 d-gap-80 project-item-${index+1} ${index % 2 === 0 ? "sm-grid-odd align-end" : ""}`}>
                                        <div className="grid-block">
                                            <div className="image-block">
                                                <img className="w-100 cover" width="" height="" src={config?.BASE_URL + project?.featuredImage} alt="" />
                                            </div>
                                        </div>
                                        <div className="grid-block">
                                            <div className={`summary-block ${index % 2 === 0 ? "sm-ms-auto sm-right" : ""}`}>
                                                <h2>{project?.title}</h2>
                                                <p>{project?.description}</p>
                                                <Link className="read-more" to={`/project/${project?.slug}`}>{getTranslatedText("View More")}</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
                )}

            </div>

            <div className="tab-banner-block half-overlay-banner-block color-light d-flex align-end sm-align-center position-relative">
                <div className="image-block w-100 h-100">
                    <img className="cover" width="" height="" src={selectedImage} alt="Step Image" />
                </div>
                <div className="wrapper-block bg-blur d-flex align-center position-absolute start-0 w-100 sm-h-100">                            
                    <div className="summary-block overflow-hidden">                                
                        <h6 className="pb-20 sm-pb-20 fw-300"><span className="fw-500">{getTranslatedText("why")}</span> {getTranslatedText("solid group")}</h6>
                        <ul className="list-block d-grid gap-20">
                            {items.map((item, index) => (
                                <li key={index} onClick={() => setSelectedImage(item.image)}>{getTranslatedText(item?.title)}</li>                            
                            ))}
                        </ul>
                    </div>                            
                </div>
            </div>
           
            {/* <Reviews reviews={reviews} getTranslatedText={getTranslatedText} /> */}
            <PropertyCard />
            <StartProject getTranslatedText={getTranslatedText} />
        </Layout>
    )
}

export default Home