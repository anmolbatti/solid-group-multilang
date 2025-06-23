import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import AddNewLanguage from '../../components/admincomponents/AddNewLanguage';

function AddLanguage({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <AddNewLanguage />            
    </>
  );
}

export default AddLanguage;
