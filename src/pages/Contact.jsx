import React, { useEffect, useState } from "react";
import Layout from "./Layout"
import { Link, useParams } from "react-router-dom"
import homeBanner from '../assets/images/contactBanner.jpg'
import designBuild from '../assets/images/design-build.png'
import renovations from '../assets/images/renovations.png'
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import config from '../config';
import axios from "axios";

const Contact = () => {
    const [isMailSent, setIsMailSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [translations, setTranslations] = useState();
    const [translation, setTranslation] = useState();
    const [selectedServices, setSelectedServices] = useState([]);
    const { lang } = useParams();
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        services: '',
        message: '',
        subject: "Solid Group Contact",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleServiceChange = (e) => {
        const { value, checked } = e.target;

        setSelectedServices((prev) =>
            checked ? [...prev, value] : prev.filter((service) => service !== value)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            if(selectedServices){
                formData.services = selectedServices.toString();
            }

            const response = await axios.post(`${config.BASE_URL}/api/admin/send-email`, formData, { withCredentials: true });
            if (response) {
                setIsMailSent(true);
                setFormData({
                    fname: '',
                    lname: '',
                    email: '',
                    phone: '',
                    message: '',
                    subject: "Solid Group Contact",
                });
            }
            setIsLoading(false);
            setTimeout(() => {
                setIsMailSent(false);
            }, 5000);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setIsMailSent(false);
            setIsLoading(false);
        }
    };

    const fetchTranslationsDetails = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-translation-page/contact`, { withCredentials: true });
            setTranslations(response.data);
        } catch (err) {
            console.log('Failed to fetch translation details');
        }
    };

    useEffect(() => {
        if (translations) {
            if (translations?.translations.length > 0) {
                var langCode = lang || "en";
                if (translations?.translations[0][langCode]) {
                    setTranslation(translations?.translations[0][langCode]);
                } else {
                    setTranslation(translations?.translations[0]["en"]);
                }
            }
        }
    }, [translations]);

    const getTranslatedText = (text) => {
        if (translation) {
            return translation[text] || text;
        } else {
            return text;
        }
    }

    useEffect(() => {
        fetchTranslationsDetails();
    }, []);

    useEffect(() => {
        fetchTranslationsDetails();
    }, [lang]);

    return (
        <Layout lang={lang || "en"}>

            <div className="contact-banner-block hero-banner-block color-light d-flex justify-center align-end top-overlay bottom-overlay position-relative overflow-hidden">
                <img className="cover" width="" height="" src={homeBanner} alt="" />
                <div className="summary-block center position-absolute z-index-1 w-100 pt-30">
                    <div className="title-block pb-10">
                        <h2>{getTranslatedText("Contact our team")}</h2>
                    </div>
                    <div className="contact-info-block border-top border-light py-30">
                        <ul className="divider-list">
                            <li className="d-flex align-center"><Link className="d-inline-flex align-center gap-10" to="mailto:info@solidgroup.com"><MdEmail /> info@solidgroup.com</Link></li>
                            <li className="d-flex align-center"><Link className="d-inline-flex align-center gap-10" to="tel:+34 1111 1111111"><FaWhatsapp /> <IoIosPhonePortrait /> +34 1111 1111111</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="contact-form form-block color-light bg-deep-gray py-80">
                <div className="container">
                    <form className="pt-30" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className="center">{getTranslatedText("Your information")}</legend>
                            <div className="form-fields top-form d-grid d-column-2 gap-30">
                                <div className="form-field">
                                    <label>{getTranslatedText("First Name")}</label>
                                    <input className="input-field" type="text" name="fname" value={formData.fname} onChange={handleChange} required />
                                </div>
                                <div className="form-field">
                                    <label>{getTranslatedText("Last Name")}</label>
                                    <input className="input-field" type="text" name="lname" value={formData.lname} onChange={handleChange} required />
                                </div>
                                <div className="form-field">
                                    <label>{getTranslatedText("Email")}</label>
                                    <input className="input-field" type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="form-field">
                                    <label>{getTranslatedText("Phone Number")}</label>
                                    <input className="input-field" type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="center">{getTranslatedText("Services you’re interested in")}</legend>
                            <div className="form-fields d-flex flex-wrap gap-20 justify-center align-center">
                                <div className="form-field checkbox-field">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="services"
                                            value="Design & Build"
                                            onChange={handleServiceChange}
                                            checked={selectedServices.includes('Design & Build')}
                                        />
                                        <span className="d-flex align-center gap-15">
                                            <img className="circle-radius cover" width="" height="" src={designBuild} alt="" />
                                            {getTranslatedText("Design & Build")}
                                        </span>
                                    </label>
                                </div>
                                <div className="form-field checkbox-field">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="services"
                                            value="Renovation"
                                            onChange={handleServiceChange}
                                            checked={selectedServices.includes('Renovation')}
                                        />
                                        <span className="d-flex align-center gap-15">
                                            <img className="circle-radius cover" width="" height="" src={renovations} alt="" />
                                            {getTranslatedText("Renovation")}
                                        </span>
                                    </label>
                                </div>
                                {/* <div className="form-field checkbox-field">
                                    <label>
                                        <input type="checkbox" name="services" value="design_build"></input>
                                        <span className="d-flex align-center gap-15">
                                            <img className="circle-radius cover" width="" height="" src={designBuild} alt="" />
                                            {getTranslatedText("Design & Build")}
                                        </span>
                                    </label>
                                </div> */}
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-fields bottom-form">
                                <div className="form-field d-flex flex-wrap gap-20 justify-center align-center">
                                    <label>{getTranslatedText("Your Message")}</label>
                                    <textarea style={{ minHeight: "120px" }} className="input-field" type="text" name="message" value={formData.message} onChange={handleChange} required />
                                </div>

                                <div className="form-field d-flex flex-wrap gap-20 justify-center align-center pt-50 flex-column">
                                    {isMailSent && <p>Thanks for contacting us...</p>}
                                    <button className="button contact-submit">Send</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
export default Contact