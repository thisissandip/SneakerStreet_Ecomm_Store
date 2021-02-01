import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import ShopAll from "./components/ShopAll/ShopAll";

function App() {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path='/'>
						<Navbar />
						<HomePage />
					</Route>
					<Route path='/shopall'>
						<Navbar />
						<ShopAll />
					</Route>
					<Route exact path='/login'>
						<Navbar />
						<LoginPage />
					</Route>
					<Route exact path='/signup'>
						<Navbar />
						<SignupPage />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
