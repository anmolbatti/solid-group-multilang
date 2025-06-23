import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import ReviewsList from '../../components/admincomponents/ReviewsList';

function Projects({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <ReviewsList  />            
    </>
  );
}

export default Projects;
