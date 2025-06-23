import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import Home from "./pages/Home"
import About from "./pages/About"
import ProjectIndex from "./pages/ProjectIndex";
import SingleProject from "./pages/SingleProject";
import Contact from "./pages/Contact";

// projects
import AddProjects from './pages/admin/AddProject';
import TranslateProject from './pages/admin/TranslateProject';
import UpdateProjects from './pages/admin/UpdateProject';
import AdminProjects from './pages/admin/AdminProjects';
import ViewProjects from './pages/admin/ViewProject';

// Reviews
import AddReview from './pages/admin/AddReview';
import TranslateReview from './pages/admin/TranslateReview';
import UpdateReview from './pages/admin/UpdateReview';
import AdminReviews from './pages/admin/AdminReviews';
import ViewReview from './pages/admin/ViewReview';

// Language
import AddLanguage from './pages/admin/AddLanguage';
import UpdateLanguage from './pages/admin/UpdateLanguage';
import AdminLanguage from './pages/admin/AdminLanguage';
import ViewLanguage from './pages/admin/ViewLanguage';

// Translations
import ViewTranslations from './pages/admin/ViewTranslations';
import UpdateTranslation from './pages/admin/UpdateTranslation';

import ProtectedRoute from './components/admincomponents/ProtectedRoutes';
import Dashboard from './pages/admin/Dashboard';
import AdminLogin from './components/admincomponents/AdminLogin';
import { PrimeReactProvider } from 'primereact/api';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const isAdminRoute = window.location.pathname.startsWith('/admin');

    useEffect(() => {
        const body = document.querySelector("body");
        if (isAdminRoute) {
            body.classList.add("adminPanel");
        } else {
            body.classList.remove("adminPanel");
        }

        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <PrimeReactProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/:lang" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/:lang/about" element={<About />} />
                        <Route path="/all-projects" element={<ProjectIndex />} />
                        <Route path="/project/:id" element={<SingleProject />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/:lang/contact" element={<Contact />} />

                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Dashboard onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/login"
                            element={
                                isAuthenticated ? (
                                    <Navigate to="/admin/dashboard" />
                                ) : (
                                    <AdminLogin onLogin={handleLogin} />
                                )
                            }
                        />

                        {/* Projects */}
                        <Route
                            path="/admin/projects"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AdminProjects onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/add-project"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AddProjects onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/translate-project/:id"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <TranslateProject onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/project/:id"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <ViewProjects onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/update-project/:id"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <UpdateProjects onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        {/* Reviews */}
                        <Route
                            path="/admin/reviews"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AdminReviews onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/add-review"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AddReview onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/review/:id"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <ViewReview onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/update-review/:id"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <UpdateReview onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/translate-review/:id"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <TranslateReview onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />


                        {/* Language */}
                        <Route
                            path="/admin/languages"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AdminLanguage onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/add-language"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AddLanguage onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/language/:id"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <ViewLanguage onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/update-language/:id"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <UpdateLanguage onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />


                        {/* Translations */}
                        <Route
                            path="/admin/translations"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <ViewTranslations onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/update-translation/:id"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <UpdateTranslation onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </PrimeReactProvider>
        </>

    )
}

export default App
