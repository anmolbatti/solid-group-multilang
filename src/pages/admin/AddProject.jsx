import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import AddNewProject from '../../components/admincomponents/AddNewProject';

function AddProject({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <AddNewProject />            
    </>
  );
}

export default AddProject;
