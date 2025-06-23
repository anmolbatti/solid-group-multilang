import React from 'react'
import { Link } from "react-router-dom"
import startProject from '../assets/images/FooterImage.jpg'
import siteLogo from '../assets/images/site-logo.svg'
import logoIcon from '../assets/images/logo-icon.svg'
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const StartProject = ({ getTranslatedText }) => {

    return (
        <div className="start-projet-banner image-banner-block color-light bg-deep-gray position-relative">
            <div className="container px-0 h-100">
                <div className="image-block d-flex align-center m-auto top-overlay position-relative h-100">
                    <img className="cover" width="" height="" src={startProject} alt="" />
                    <div className="summary-block position-absolute top-0 px-30 sm-px-60 w-100 pt-70 sm-pt-130">
                        <h2>{getTranslatedText("Start your own project")}</h2>
                        <p>{getTranslatedText("Contact our team now to schedule an initial meeting.")}</p>
                        <Link className="read-more" to="/contact">{getTranslatedText("Start Now")}</Link>
                    </div>
                </div>
            </div>
            <div className='site-footer py-30 sm-py-10 position-absolute bottom-0 start-0 w-100'>
                <div className='wrapper px-30'>
                    <div className='grid-blocks d-grid d-small-large'>
                        <div className='grid-block left-block'>
                            <Link to='/'><img className="m-hide" width="" height="" src={siteLogo} alt="" /></Link>
                            <img className="d-hide" src={logoIcon} alt="" />
                        </div>
                        <div className='grid-block right-block d-flex justify-start sm-justify-end align-center pt-40 sm-pt-0'>
                            <div className='footer-nav'>
                                <ul className='d-d-flex align-center sm-d-grid sm-gap-20'>
                                    <li><Link to=''>projects</Link></li>
                                    <li><Link to=''>about</Link></li>
                                    <li className='sm-d-flex align-center justify-between'><Link to=''>contact</Link>
                                        <ul className='social-icon-list sm-d-flex d-d-none align-center gap-10'>
                                            <li><Link to=''><FaInstagram /></Link></li>
                                            <li><Link to=''><FaWhatsapp /></Link></li>
                                        </ul>
                                    </li>
                                    <li className='border-left border-right border-white m-hide'><Link to=''>privacy policy</Link></li>
                                </ul>
                            </div>
                            <div className='footer-icons sm-hide ps-10'>
                                <ul className='social-icon-list d-flex align-center gap-10'>
                                    <li><Link to=''><FaInstagram /></Link></li>
                                    <li><Link to=''><FaWhatsapp /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartProject
