import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import ProjectsList from '../../components/admincomponents/ProjectsList';

function Projects({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <ProjectsList  />            
    </>
  );
}

export default Projects;
