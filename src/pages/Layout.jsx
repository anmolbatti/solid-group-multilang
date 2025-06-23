import React, { useEffect } from "react"
import { useLocation } from "react-router-dom";
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../assets/css/style.css"
import "../assets/fonts/fonts.css"

const Layout = ({ children, lang, project, isHomePage }) => { 
    const { pathname } = useLocation();    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return (
        <div className={`site`}>
            <Header lang={lang} project={project} isHomePage={isHomePage}/>
            {children}
            <Footer />
        </div>
    )
}

export default Layout