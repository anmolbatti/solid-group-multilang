import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import TranslateNewReview from '../../components/admincomponents/TranslateReview';

function TranslateReview({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <TranslateNewReview />            
    </>
  );
}

export default TranslateReview;
