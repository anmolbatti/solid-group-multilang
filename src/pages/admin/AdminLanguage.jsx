import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import LanguageList from '../../components/admincomponents/LanguageList';

function AdminLanguage({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <LanguageList  />            
    </>
  );
}

export default AdminLanguage;
