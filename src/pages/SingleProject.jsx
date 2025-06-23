import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import Layout from "./Layout"
import { Swiper, SwiperSlide } from 'swiper/react';
import StartProject from "../components/StartProject";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from '../config';

const SingleProject = () => {
    const { id } = useParams();
    const [isSticky, setIsSticky] = useState(false); 
    const [project, setProject] = useState();
    const [currenAmenity, setCurrenAmenity] = useState({});
    const [currentLang, setCurrentLang] = useState("en");

    const [translations, setTranslations] = useState();
    const [translation, setTranslation] = useState();

    useEffect(() => {
        const handleStickyScroll = () => {
            const stickyBlock = document.querySelector(".tab-block");
            const banner = document.querySelector(".project-hero-banner-block");
            if (!stickyBlock || !banner) return;
            const blockTop = stickyBlock.getBoundingClientRect().top;
            const bannerBottom = banner.getBoundingClientRect().bottom;
            if (blockTop <= 65 && bannerBottom <= 130) {
                if (!isSticky) {                
                    setIsSticky(true);
                }
            } else {
                if (isSticky){                
                    setIsSticky(false);
                }
            }
        };
        window.addEventListener("scroll", handleStickyScroll);
        return () => window.removeEventListener("scroll", handleStickyScroll);
    }, [isSticky]);

    // Section scroll on click tab
    const projectTabs = [
        { id: 1, title: "Gallery", sectionId: "gallery-section" },
        { id: 2, title: "Amenities", sectionId: "amenities-section" },
        { id: 3, title: "More", sectionId: "more-section" }        
    ];
    const [activeTab, setActiveTab] = useState(projectTabs[0].id);
    const handleScroll = (sectionId, id) => {
        setActiveTab(id); 
        const section = document.getElementById(sectionId);
        const offset = 140;
        if (section){
            const sectionPosition = section.offsetTop;
                window.scrollTo({
                top: sectionPosition - offset, 
                behavior: "smooth"
            });
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
                var langCode = currentLang.toLowerCase() || "en";
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
        fetchTranslationsDetails();
    }, [currentLang]);

    useEffect(() => {
        fetchTranslationsDetails();
    }, []);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/single-project/${id}`, { withCredentials: true });
                setProject(response.data);
                setCurrentLang(response.data?.language);

                if(response.data?.amenities.length > 0){
                    setCurrenAmenity(response.data?.amenities[0]);
                }
            } catch (err) {
                setError('Failed to fetch project details');
            }
        };

        fetchProjectDetails();
    }, [id, currentLang]);

    return (

        <Layout project={project}>

            <div className="project-hero-banner-block hero-banner-block color-light d-flex justify-center align-end full-screen top-overlay bottom-overlay position-relative overflow-hidden">
                <img className="cover" width="" height="" src={config?.BASE_URL + project?.featuredImage} alt="" />
                <div className="position-absolute z-index-2 w-100">
                    <div className="summary-block summary-block-1 center m-auto pb-10 px-30">
                        <h2>{project?.title}</h2>
                        <p>{project?.description}</p>
                    </div>

                    {/* <div className='availableTranslations' style={{display: "flex", gap: "20px", justifyContent: "center"}}>
                        {project?.parentId !== null ? (
                            <Link to={`/project/${project?.parentId?.slug}`}><span>{project?.parentId?.language}</span></Link>
                        ) : (
                            <Link to={`/project/${project?.slug}`}><span>{project?.language}</span></Link>
                        )}
                        {project && project?.translations.length > 0 && project?.translations.map((translation) => (
                            <Link to={`/project/${translation?.slug}`}><span>{translation?.code}</span></Link>
                        ))}
                    </div> */}
                    <div className="meta-block border-top border-light py-25">
                        <ul className="divider-list">
                            <li><span>{project?.status}</span></li>
                            <li>{project?.space}</li>
                            <li>{project?.beds} Bed {project?.baths} Bath</li>
                        </ul>
                    </div>
                    <div className={`tab-block border-top border-light py-25 px-20 ${isSticky ? "sticky position-fixed start-0 z-index-2 w-100" : ""}`}>
                        <ul className="divider-list center">
                            {projectTabs.map((tab) => (
                                <li key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => handleScroll(tab.sectionId, tab.id)}>{tab.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div id="gallery-section" className="richtext-block m-pt-70 m-pb-80 pt-130 pb-100">
                <div className="container">
                    <div className="summary-block center m-auto w-100">
                        <h2>“{project?.galleryTitle1}”</h2>
                        <p>{project?.galleryDesc1}</p>
                    </div>
                </div>
            </div>

            <div className="multicolumn-block m-pb-80 pb-100">
                <div className="container">
                    <div className="grid-blocks d-grid d-column-2 gap-30 d-gap-50">
                        <div className="grid-block">
                            {project?.galleryImages?.length >= 1 && (
                                <div className="image-block">
                                    <img width="" height="" className='cover' src={config?.BASE_URL + project?.galleryImages[0]} alt="" />
                                </div>
                            )}
                        </div>
                        <div className="grid-block">
                            {project?.galleryImages?.length >= 2 && (
                                <div className="image-block">
                                    <img width="" height="" className='cover' src={config?.BASE_URL + project?.galleryImages[1]} alt="" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="image-banner-block">
                {project?.galleryBannerImage && (
                    <div className="image-block h-100">
                        <img className="w-100 cover" width="" height="" src={config?.BASE_URL + project?.galleryBannerImage} alt="" />
                    </div>
                )}
            </div>

            <div className="single-project-carousel carousel-block m-pt-70 m-pb-80 pt-80 pb-100">
                <div className="container">
                    <div className="title-block center m-auto pb-40 w-100">
                        <h6>{project?.galleryTitle2}</h6>
                        <p>{project?.galleryDesc2}</p>
                    </div>
                </div>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1.15}
                    loop={true}
                    centeredSlides={true}
                    breakpoints={{
                        641: { slidesPerView: 3.2, spaceBetween: 2},
                        1025: { slidesPerView: 3.8, spaceBetween: 20}
                    }}
                    className="single-project-slider"
                >
                    {project?.galleryImages?.length > 0 && project?.galleryImages.map(item => (
                        <SwiperSlide>
                            <div className="image-block">
                                <img className="w-100 cover" width="" height="" src={config?.BASE_URL + item} alt="" />   
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>        
            <div id="amenities-section" className="amenities-section half-overlay-banner-block tab-banner-block color-light d-flex align-end sm-align-center position-relative">
                <div className="image-block w-100 h-100">
                    <img className="cover" width="" height="" src={config?.BASE_URL + currenAmenity?.image} alt="" />
                </div>                
                <div className="wrapper-block bg-blur d-flex align-center position-absolute start-0 w-100 sm-h-100">
                    <div className="summary-block overflow-hidden">
                        <h2 className="sm-pb-20 px-30 sm-px-0">Amenities</h2>
                        <ul className="list-block d-grid gap-20">
                            {project?.amenities && project?.amenities.length > 0 && project?.amenities.map(item => (
                                <li className={currenAmenity?.title === item?.title ? "active" : ""} onClick={(e) => setCurrenAmenity(item)}>{item?.title}</li>                               
                            ))}
                        </ul>                                
                    </div>
                </div>
            </div>
            <StartProject getTranslatedText={getTranslatedText} />
        </Layout>
        
    )
}

export default SingleProject
