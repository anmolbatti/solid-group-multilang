import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import TranslationDetails from '../../components/admincomponents/TranslationDetails';

function ViewTranslations({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <TranslationDetails />            
    </>
  );
}

export default ViewTranslations;
