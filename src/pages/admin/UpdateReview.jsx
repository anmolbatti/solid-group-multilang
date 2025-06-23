import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import UpdateReviewDetail from '../../components/admincomponents/UpdateReviewDetail';

function UpdateProject({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <UpdateReviewDetail />            
    </>
  );
}

export default UpdateProject;
