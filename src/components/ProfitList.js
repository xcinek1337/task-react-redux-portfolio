import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import '../style/profitList.scss';

// dodac do reduceraa czyszczenie stanu po submicie
//


const ProfitList = () => {
	const investmentInfo = useSelector((state) => state.investmentInfo);
	const { isSubmitValid } = investmentInfo;

	const storedInvestments = JSON.parse(localStorage.getItem('investments')) || [];
	useEffect(() => {
		if (isSubmitValid) {
			const newInvestments = [...storedInvestments, investmentInfo];
			localStorage.setItem('investments', JSON.stringify(newInvestments));
		}
	}, [isSubmitValid]);

	// const renderInvest = () => (
	// 	<>
	// 		<td>{selectedCode}</td>
	// 		<td>{purchaseDate}</td>
	// 		<td>{amount}</td>
	// 		<td>{oldPrice}</td>
	// 		<td>{todaysPrice}</td>
	// 		<td>{(amount * todaysPrice).toFixed(2)}</td>
	// 		<td>{(((amount * todaysPrice - amount * oldPrice) / (amount * oldPrice)) * 100).toFixed(2)}%</td>
	// 	</>
	// );
	const renderInvest = () => {
		return storedInvestments.map((invest, index) => {
			const { selectedCode, purchaseDate, amount, oldPrice, todaysPrice } = invest;
			return (
				<tr key={index}>
					<td>{selectedCode}</td>
					<td>{purchaseDate}</td>
					<td>{amount}</td>
					<td>{oldPrice}</td>
					<td>{todaysPrice}</td>
					<td>{(amount * todaysPrice).toFixed(2)}</td>
					<td>{(((amount * todaysPrice - amount * oldPrice) / (amount * oldPrice)) * 100).toFixed(2)}%</td>
				</tr>
			);
		});
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
				<tbody>{renderInvest()}</tbody>
			</table>
		</div>
	);
};

export default ProfitList;
