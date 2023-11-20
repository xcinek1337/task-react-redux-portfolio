import React from 'react';

import Navbar from './Navbar';
import CurrencyFormPanel from './CurrencyFormPanel';
import ProfitList from './ProfitList';

const CurrencyApp = () => {
  return (
    <>
      <Navbar />
      <CurrencyFormPanel />
      <ProfitList />
    </>
  );
};
export default CurrencyApp;
