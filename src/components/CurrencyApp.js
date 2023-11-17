import React, { useEffect, useState } from 'react';
import todaysDay from '../utilities/todaysDay';
import { allCurrenciesAPI, ProvidePriceAPI } from '../providers/currencyAPI';

const API_KEY = '2665e52a5c8d9599141c1e1d812b7492';

const CurrencyApp = () => {
	const [allCurrencies, setAllCurrencies] = useState('');
	const [selectedCurrency, setSelectedCurrency] = useState('');
	const [purchaseDate, setPurchaseDate] = useState('');
	const [oldPrice, setOldPrice] = useState('');
	const [todaysPrice, setTodaysPrice] = useState('');
	const [amount, setAmount] = useState('');

	const [items, setItems] = useState([]);

	useEffect(() => {
		if (todaysPrice !== '') {
			createItem();
		}
	}, [todaysPrice]);

	useEffect(() => {
		const fetchData = async () => {
			const startTime = Date.now();

			try {
				const data = todaysDay();
				const currency = await allCurrenciesAPI(data);
				setAllCurrencies(currency);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				const endTime = Date.now();
				const duration = endTime - startTime;
				console.log('Fetch duration:', duration, 'ms');
			}
		};

		fetchData();
	}, []);
	useEffect(() => {
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (selectedCurrency && dateRegex.test(purchaseDate)) {
			fetchDataAndLog(selectedCurrency);
		}
	}, [selectedCurrency, purchaseDate]);

	const fetchDataAndLog = async selectedCurrency => {
		try {
			const result = await ProvidePriceAPI(purchaseDate, selectedCurrency);
			console.log(result);
			setOldPrice(result);
		} catch (error) {
			console.error('error', error);
		}
	};
	const fetchActuallyPrice = async selectedCurrency => {
		try {
			const result = await ProvidePriceAPI(todaysDay(), selectedCurrency);
			console.log('Todays price @-------', Number(result));
			setTodaysPrice(Number(result));
		} catch (error) {
			console.error('error', error);
		} finally {
		}
	};

	const handleSelectChange = event => {
		const selectedValue = event.target.value;
		setSelectedCurrency(selectedValue);

		console.log('Selected currency:', selectedValue);
	};
	const handleSubmit = async e => {
		e.preventDefault();
		await fetchActuallyPrice(selectedCurrency);
	};
	const createItem = () => {
		const newItem = {
			currency: selectedCurrency,
			amount: amount,
			purchaseDate: purchaseDate,
			oldPrice: oldPrice,
			todaysPrice: todaysPrice,
			currentValue: todaysPrice * amount,
			profitLoss: todaysPrice * amount - oldPrice * amount,
		};

		setItems(prevItems => [...prevItems, newItem]);
	};

	return (
		<>
			<div>
				<form onSubmit={handleSubmit} action=''>
					<select value={selectedCurrency} onChange={handleSelectChange}>
						{/* Dodaj opcje do select na podstawie danych */}
						{selectedCurrency === '' && (
							<option value='' disabled hidden>
								pick currency
							</option>
						)}
						{allCurrencies &&
							Object.keys(allCurrencies.rates).map((currencyCode, index) => (
								<option key={index} value={currencyCode}>
									{currencyCode}
								</option>
							))}
					</select>
					<div>
						<label htmlFor=''>ilość:</label>
						<input type='number' value={amount} onChange={e => setAmount(e.target.value)} />
					</div>
					<div>
						<label htmlFor=''>Data Kupna:</label>
						<input type='text' placeholder='RRRR-MM-DD' onChange={e => setPurchaseDate(e.target.value)} />
					</div>
					<div>
						<label htmlFor=''>Cena zakupu:</label>
						{/* zmienic na value i onchange, bo nie aktualizuje sie na nowo, tylko za 1 wpisaniem w input */}
						<input type='text' defaultValue={oldPrice} onChange={e => setOldPrice(e.target.value)} />
					</div>
					<input type='submit' />
				</form>
			</div>
			<table>
				<thead style={{ outline: '1px solid black' }}>
					<tr>
						<th>Waluta:</th>
						<th style={{ outline: '1px solid black' }}>Kwota:</th>
						<th style={{ outline: '1px solid black' }}>Data Zakupu:</th>
						<th style={{ outline: '1px solid black' }}>Kurs Kupno:</th>
						<th style={{ outline: '1px solid black' }}>Kurs Teraz:</th>
						<th style={{ outline: '1px solid black' }}>Aktualna Wartość:</th>
						<th style={{ outline: '1px solid black' }}>Zysk/Strata</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, index) => (
						<tr key={index}>
							<td style={{ outline: '1px solid black' }}>{item.currency}</td>
							<td style={{ outline: '1px solid black' }}>{item.amount}</td>
							<td style={{ outline: '1px solid black' }}>{item.purchaseDate}</td>
							<td style={{ outline: '1px solid black' }}>{item.oldPrice}</td>
							<td style={{ outline: '1px solid black' }}>{item.todaysPrice}</td>
							<td style={{ outline: '1px solid black' }}>{item.currentValue}</td>
							<td style={{ outline: '1px solid black' }}>{item.profitLoss}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
export default CurrencyApp;
