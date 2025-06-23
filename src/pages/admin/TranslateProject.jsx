import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import TranslateNewProject from '../../components/admincomponents/TranslateProject';

function TranslateProject({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <TranslateNewProject />            
    </>
  );
}

export default TranslateProject;
