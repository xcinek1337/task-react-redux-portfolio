import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import '../style/profitList.scss';

const ProfitList = () => {
	const investmentsList = useSelector((state) => state.investments);

	useEffect(() => {
		const storedInvestments = JSON.parse(localStorage.getItem('investmentsList')) || [];

		const hasChanged = JSON.stringify(investmentsList) !== JSON.stringify(storedInvestments);

		if (hasChanged) {
			localStorage.setItem('investmentsList', JSON.stringify(investmentsList));
		}
	}, [investmentsList]);

	const renderInvest = () => {
		return investmentsList.map((invest, index) => {
			if (!invest) {
				return null;
			}
			const { selectedCode, purchaseDate, amount, oldPrice, todaysPrice } = invest;
			const profit = (((amount * todaysPrice - amount * oldPrice) / (amount * oldPrice)) * 100).toFixed(2);

			return (
				<tr key={index}>
					<td>{selectedCode}</td>
					<td>{purchaseDate}</td>
					<td>{amount}</td>
					<td>{oldPrice}</td>
					<td>{todaysPrice}</td>
					<td>{(amount * todaysPrice).toFixed(2)}</td>
					<td className={profit > 0 ? 'table__profit-td' : 'table__lose-td'}>{profit}%</td>
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
