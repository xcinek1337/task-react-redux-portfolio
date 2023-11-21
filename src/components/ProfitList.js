import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import '../style/profitList.scss';

const ProfitList = () => {
	const investmentsList = useSelector((state) => state.investments);

	const totalSum = investmentsList.reduce((sum, invest) => {
		return sum + parseFloat(invest.amount);
	}, 0);
	const totalCurrentSum = investmentsList.reduce((sum, invest) => {
		return sum + parseFloat(invest.amount * invest.todaysPrice);
	}, 0);
	const profitLoss = investmentsList.map((invest) => {
		const profitLoss = parseFloat(
			((invest.amount * invest.todaysPrice - invest.amount * invest.oldPrice) / (invest.amount * invest.oldPrice)) * 100
		);

		return profitLoss.toFixed(2);
	});
	const readyProfitLoss = profitLoss.reduce((curr, acc) => {
		return curr + parseFloat(acc);
	}, 0);
	console.log(readyProfitLoss);
	const renderInvest = () => {
		return investmentsList && investmentsList.length > 0
			? investmentsList.map((invest, index) => {
					if (invest) {
						const { selectedCode, purchaseDate, amount, oldPrice, todaysPrice } = invest;
						const profit = (((amount * todaysPrice - amount * oldPrice) / (amount * oldPrice)) * 100).toFixed(2);

						return (
							<tr key={index}>
								<td>{selectedCode}</td>
								<td>{purchaseDate}</td>
								<td>{amount} PLN</td>
								<td>{oldPrice}</td>
								<td>{todaysPrice}</td>
								<td>{(amount * todaysPrice).toFixed(2)} PLN</td>
								<td className={profit > 0 ? 'table__profit-td' : 'table__lose-td'}>{profit}%</td>
							</tr>
						);
					}
					return null;
			  })
			: null;
	};

	return (
		<div className='profit__wrapper'>
			<table className='profit__table table'>
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
				{investmentsList.length >= 1 && <tbody>{renderInvest()}</tbody>}
				<tfoot>
					<tr>
						<td>total amount of investment:</td>
						<td>=====</td>
						<td>{totalSum} PLN</td>
						<td>======</td>
						<td>=======</td>
						<td>{totalCurrentSum} PLN</td>
						<td className={readyProfitLoss > 0 ? 'table__profit-td' : 'table__lose-td'}>
							{readyProfitLoss === 'NaN' ? '0' : readyProfitLoss.toFixed(2)}%
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default ProfitList;
