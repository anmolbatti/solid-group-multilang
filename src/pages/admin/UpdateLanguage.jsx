import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import UpdateLanguageDetail from '../../components/admincomponents/UpdateLanguageDetail';

function UpdateLanguage({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <UpdateLanguageDetail />            
    </>
  );
}

export default UpdateLanguage;
