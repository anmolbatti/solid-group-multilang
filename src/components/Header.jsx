import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useLocation, useNavigate } from "react-router-dom";
import siteLogo from '../assets/images/site-logo.svg'
import logoIcon from '../assets/images/logo-icon.svg'
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import config from '../config';
import axios from "axios";

const Header = ({ lang, project, isHomePage = false }) => {
    const location = useLocation();
    // const [isHomePage, setIsHomePage] = useState(false);
    const [languages, setLanguages] = useState([]);
    const navigate = useNavigate();
    const [currentLanguage, setCurrentLanguage] = useState(lang || "en");

    const [isHeroLogo, setIsHeroLogo] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const logoBlock = document.querySelector(".left-block");
            const banner = document.querySelector(".hero-logo");
            if (!logoBlock || !banner) return;
            const blockTop = logoBlock.getBoundingClientRect().top;
            const bannerBottom = banner.getBoundingClientRect().bottom;
            if (blockTop <= 78 && bannerBottom <= 78) {
                if (!isHeroLogo) {
                    setIsHeroLogo(true);
                }
            } else {
                if (isHeroLogo) {
                    setIsHeroLogo(false);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHeroLogo]);

    const [isNavOpen, setisNavOpen] = useState(false);
    const toggleNav = () => {
        setisNavOpen(prev => !prev);
    }
    const [isOpen, setIsOpen] = useState(false);

    const fetchLanguages = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-languages`, { withCredentials: true });

            if (response.data) {
                setLanguages(response.data);
            }

        } catch (err) {
            console.log('Failed to fetch languages');
        }
    };

    const changeLanguage = (language) => {
        var href = window.location.href.split("/");
        const url = `/${language}/${href[href.length - 1]}`;
        setCurrentLanguage(language);
        navigate(url)
    }

    useEffect(() => {
        fetchLanguages();
    }, []);

    useEffect(() => {
        if (project) {
            setCurrentLanguage(project?.language?.toLowerCase());
        }
    }, [project]);


    return (
        <header className="site-header color-light position-fixed top-0 start-0 w-100 px-20 d-px-30">
            <div className="wrapper-block d-flex position-relative">
                <div className={`left-block d-flex align-center ${isHomePage ? "initial-hide" : ""} ${isHeroLogo ? 'initial-show' : ""}`}>
                    <div className="site-logo logo-block">
                        <Link to="/">
                            <img className="m-hide" width="" height="" src={isHomePage ? siteLogo : logoIcon} alt="" />
                            <img className="d-hide" src={logoIcon} alt="" />
                        </Link>
                    </div>
                </div>
                <div className="right-block d-flex align-center gap-20 position-absolute end-0 h-100">
                    <div className={`nav-icon-block d-flex align-center border-right border-light pe-20 ${isNavOpen ? 'open' : ''}`} onClick={toggleNav}>
                        <HiOutlineMenuAlt4 className="open-icon" /> <IoCloseOutline className="close-icon" />
                    </div>
                    <div className={`language-block d-flex align-center gap-10 position-relative h-100 ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                        {currentLanguage.toString().toUpperCase()} <IoIosArrowDown />
                        <ul className="color-dark uppercase position-absolute end-0">
                            {lang ? languages.length > 0 && languages.map((language, key) => (
                                <li className={currentLanguage === language?.code ? "active" : ""} onClick={() => changeLanguage(language?.code)}>{language?.code.toUpperCase()}</li>
                            )) : (
                                project && (
                                    <>
                                        {project?.parentId !== null ? (
                                            <>
                                                <li className={currentLanguage === project?.parentId?.language ? "active" : ""} onClick={() => navigate(`/project/${project?.parentId?.slug}`)}>{project?.parentId?.language}</li>

                                                {project?.parentId?.translations.length > 0 && project?.parentId?.translations.map((translation) => (

                                                    <li className={currentLanguage === translation?.code ? "active" : ""} onClick={() => navigate(`/project/${translation?.slug}`)}>{translation?.code}</li>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                <li className={currentLanguage === project?.language ? "active" : ""} onClick={() => navigate(`/project/${project?.slug}`)}>{project?.language}</li>

                                                {project?.translations.length > 0 && project?.translations.map((translation) => (

                                                    <li className={currentLanguage === translation?.code ? "active" : ""} onClick={() => navigate(`/project/${translation?.slug}`)}>{translation?.code}</li>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`site-nav ${isNavOpen ? 'open' : ''}`}>
                <ul className="d-grid gap-30 h6">
                    <li><Link>Services</Link></li>
                    <li><Link>Our Portfolio</Link></li>
                    <li><Link to={`/${currentLanguage}/about`}>About</Link></li>
                    <li><Link to={`/${currentLanguage}/contact`}>Contact</Link></li>
                    <li className="d-flex gap-20"></li>
                </ul>
            </div>
        </header>
    )
}
export default Header   