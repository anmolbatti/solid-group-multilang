import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; 

const isAdminRoute = window.location.pathname.startsWith("/admin");
if(isAdminRoute){
  import("../../assets/css/admin.css");
  import("primereact/resources/themes/lara-light-cyan/theme.css");
}

function DashboardHeader({onLogout}) {
    const navigate = useNavigate();
    const handleLogoutClick = () => {
        onLogout();
        navigate('/admin/login'); 
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [navigate]);

    return (       
        <nav className="dashboard-nav">
                <div className="logo">
                    <a href="http://localhost:3000/">
                        <span className="fa fa-wordpress"></span>
                    </a>
                </div>
                <ul className="main-nav">
                    <li>
                        <Link to="/admin/dashboard">
                            <span className="fa fa-home"></span>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/projects">
                            <span className="fa fa-home"></span>
                            Projects
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews">
                            <span className="fa fa-home"></span>
                            Reviews
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/languages">
                            <span className="fa fa-home"></span>
                            Languages
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/translations">
                            <span className="fa fa-home"></span>
                            Translations
                        </Link>
                    </li>

                    <li>
                        <a onClick={handleLogoutClick} className="logout-btn">
                            <span className="fa fa-sign-out"></span>
                            Logout
                        </a>
                    </li>                   
                </ul>
            </nav>
    );
}

export default DashboardHeader;
