import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import AddNewReview from '../../components/admincomponents/AddNewReview';

function AddProject({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <AddNewReview />            
    </>
  );
}

export default AddProject;
