import React from 'react';

import '../style/navbar.scss';

const Navbar = () => {
	return (
		<nav className='nav'>
			<div className='nav__wrapper'>
				<div className='nav__logo-cointainer'>
					<p className='nav__logo'>ProfitCurrency.io</p>
				</div>
				<div className='nav__describe' >Check your investments</div>
			</div>
		</nav>
	);
};

export default Navbar;
