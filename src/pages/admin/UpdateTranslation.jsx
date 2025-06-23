import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import UpdateTranslationDetail from '../../components/admincomponents/UpdateTranslationDetail';

function UpdateTranslation({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <UpdateTranslationDetail />            
    </>
  );
}

export default UpdateTranslation;
