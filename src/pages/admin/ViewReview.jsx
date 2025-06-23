import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import ReviewDetails from '../../components/admincomponents/ReviewDetails';

function ViewProject({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <ReviewDetails />            
    </>
  );
}

export default ViewProject;
