import React from 'react';

import '../style/profitList.scss';

const ProfitList = () => {
  return (
    <div className="profit__wrapper">
      <table className="profit__table table">
        <thead>
          <tr>
            <th>Currency:</th>
            <th>Purchase Date:</th>
            <th>Amount:</th>
            <th>Exchange Rate on Purchase Day:</th>
            <th>Exchange Rate Today:</th>
            <th>Current Investment Value:</th>
            <th>Profit/Loss:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfitList;
