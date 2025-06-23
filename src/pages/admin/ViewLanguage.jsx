import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import LanguageDetails from '../../components/admincomponents/LanguageDetails';

function ViewLanguage({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <LanguageDetails />            
    </>
  );
}

export default ViewLanguage;
