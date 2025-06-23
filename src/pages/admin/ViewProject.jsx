import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import ProjectDetails from '../../components/admincomponents/ProjectDetails';

function ViewProject({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <ProjectDetails />            
    </>
  );
}

export default ViewProject;
