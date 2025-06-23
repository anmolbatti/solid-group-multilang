import React, { useEffect, useState } from "react";
import Layout from "./Layout"
import { Link, useParams } from "react-router-dom"
import ClientReviews from "../components/ClientReviews"
import Instagram from "../components/Instagram"
import StartProject from "../components/StartProject"
import about from '../assets/images/aboutBanner.jpg'
import designBuild from '../assets/images/design1.jpg'
import renovations from '../assets/images/design2.png'
import renovations1 from '../assets/images/design3.jpg'
import tabImg1 from '../assets/images/amenities.jpg'
import tabImg2 from '../assets/images/home-banner.jpg'
import tabImg3 from '../assets/images/project-banner.jpg'
import tabImg4 from '../assets/images/amenities.jpg'
import tabImg5 from '../assets/images/aboutWhySolid.jpg'
import aboutBanner from '../assets/images/expendBanner.jpg'
import aboutBannerMobile from '../assets/images/expendBanerMobile.jpg'
import config from '../config';
import axios from "axios";
import PropertyCard from "../components/PropertyCard";

const About = () => {
    const [translations, setTranslations] = useState();
    const [translation, setTranslation] = useState();
    const { lang } = useParams();

    const fetchTranslationsDetails = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-translation-page/about`, { withCredentials: true });
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
        fetchTranslationsDetails();
    }, []);

    useEffect(() => {
        fetchTranslationsDetails();
    }, [lang]);

    const items = [
            { title: "Nordic-inspired architecture with a Mediterranean influence", image: tabImg5 },
            { title: "Emphasis on quality, sustainability, and timeless aesthetics", image: tabImg5 },
            { title: "Turnkey design and build services", image: tabImg5 },
            { title: "Highly personalized client experience", image: tabImg5 }
        ];
    const [selectedImage, setSelectedImage] = useState(items[0].image);

    return (
        <Layout lang={lang || "en"}>
            <div className="image-with-text-block color-light bg-deep-gray">
                <div className="grid-blocks d-grid align-center d-column-2">
                    <div className="grid-block full-screen">
                        <div class="image-block h-100">
                            <img className="cover" width="" height="" src={about} alt="" />
                        </div>
                    </div>
                    <div className="grid-block">
                        <div className="summary-block px-30 sm-px-100 pt-100 pb-120 sm-py-80 w-100">
                            <h2 className="mb-30">{getTranslatedText("A signature balance between bespoke design and nordic simplicity for beautiful, functional homes.")}</h2>
                            <div className="list-block mb-30">
                                <ul className="d-flex">
                                    <li>MARBELLA</li>
                                    <li>MALAGA</li>
                                    <li>GREATER ANDALUCIA</li>
                                </ul>
                            </div>
                            <p>{getTranslatedText("Solid Group is a boutique design and build firm specializing in custom luxury villas across the Costa del Sol and select international destinations. Our architectural approach is grounded in the principles of Nordic design—clean lines, natural textures, and functional elegance—brought to life with a Mediterranean sensibility.")}</p>
                            {/* <div className="wrapper-block d-flex gap-100 pt-40">
                                <div className="counter-block d-grid gap-30">
                                    <div className="number-block">150</div>
                                    <div className="text-block h6">{getTranslatedText("Projects completed")}</div>
                                </div>
                                <div className="counter-block d-grid gap-30">
                                    <div className="number-block">10</div>
                                    <div className="text-block h6">{getTranslatedText("Years experience")}</div>
                                </div>                                
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-page text-with-list-block m-pt-60 pt-100 pb-80">
                <div className="container">
                    <div className="grid-blocks d-grid gap-60">
                        <div className="grid-block">
                            <div className="summary-block">
                                <h3>{getTranslatedText("Every project is a bespoke journey. We offer turnkey design and build services that blend refined aesthetics with meticulous craftsmanship and sustainable practices.")} </h3>
                                <Link className="read-more" to="/contact">{getTranslatedText("Contact us")}</Link>
                            </div>
                        </div>
                        <div className="grid-block">
                            <div className="list-blocks d-grid gap-30">
                                <div className="list-block d-flex xs-gap-20 gap-30 align-center">
                                    <div className="image-block">
                                        <img width="" height="" className="cover" src={designBuild} alt="" />
                                    </div>
                                    <div className="summary-block">
                                        {/* <h6>{getTranslatedText("Design & Bulid")}</h6> */}
                                        <p>{getTranslatedText("High-quality natural stone and masonry techniques.")}</p>
                                    </div>
                                </div>
                                <div className="list-block d-flex xs-gap-20 gap-30 align-center">
                                    <div className="image-block">
                                        <img width="" height="" className="cover" src={renovations} alt="" />
                                    </div>
                                    <div className="summary-block">
                                        {/* <h6>{getTranslatedText("Renovations")}</h6> */}
                                        <p>{getTranslatedText("Timeless natural wood joinery design and installations.")}</p>
                                    </div>
                                </div>
                                <div className="list-block d-flex xs-gap-20 gap-30 align-center">
                                    <div className="image-block">
                                        <img width="" height="" className="cover" src={renovations1} alt="" />
                                    </div>
                                    <div className="summary-block">
                                        {/* <h6>{getTranslatedText("Renovations")}</h6> */}
                                        <p>{getTranslatedText("Hand-crafted elements and building techniques meant to last.")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            {/* <ClientReviews /> */}
            <PropertyCard />
            <div className="expending-banner image-banner-block color-light d-flex align-center overlay position-relative">
                <picture className="cover">
                    <source media="(max-width:768px)" srcset={aboutBannerMobile} />
                    <img className="cover" width="" height="" src={aboutBanner} alt="" />
                </picture>
                <div className="position-absolute w-100">
                    <div className="container">
                        <div className="wrapper-block d-grid d-column-2 gap-30 d-gap-60">
                            <div className="grid-block left-block d-flex align-center">
                                <h2 className="mb-0">Expanding across Costa del Sol</h2>
                            </div>
                            <div className="grid-block right-block d-flex align-center justify-start sm-justify-end">
                                <div className="list-block">
                                    <ul className="d-flex">
                                        <li>MARBELLA</li>
                                        <li>MALAGA</li>
                                        <li>GREATER ANDALUCIA</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
            <Instagram />
            <StartProject getTranslatedText={getTranslatedText} />      
        </Layout>
    )
}

export default About
