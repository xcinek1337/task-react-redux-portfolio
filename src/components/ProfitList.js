import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import '../style/profitList.scss';

const ProfitList = () => {
	const investmentsList = useSelector((state) => state.investments);

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
								<td>{amount}</td>
								<td>{oldPrice}</td>
								<td>{todaysPrice}</td>
								<td>{(amount * todaysPrice).toFixed(2)}</td>
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
			</table>
		</div>
	);
};

export default ProfitList;
