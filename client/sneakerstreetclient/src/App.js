import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import ShopAll from './components/ShopAll/ShopAll';
import CartPage from './components/CartPage/CartPage';
import ItemPage from './components/ItemPage/ItemPage';
import Checkout from './components/Checkout/Checkout';
import MyOrders from './components/MyOrders/MyOrders';
import Err404 from './components/Err404/Err404';
import ProtectedRoute from './ProtectedRoute';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />

				<Switch>
					<Route exact path='/'>
						<HomePage />
					</Route>
					<Route path='/shopall'>
						<ShopAll />
					</Route>
					<Route exact path='/login'>
						<LoginPage />
					</Route>
					<Route exact path='/signup'>
						<SignupPage />
					</Route>
					<ProtectedRoute exact path='/cart' component={CartPage} />
					<ProtectedRoute exact path='/myorders' component={MyOrders} />
					<Route exact path='/sneaker/:itemid'>
						<ItemPage />
					</Route>
					<ProtectedRoute exact path='/checkout' component={Checkout} />
					<Route path='*' component={Err404} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
