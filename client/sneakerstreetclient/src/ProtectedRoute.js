import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, ...rest }) {
	const user = useSelector((state) => state.authR.user);
	const isloading = useSelector((state) => state.authR.isloading);

	const isAuthenticated = localStorage.getItem('ssauth');

	return (
		<Route
			{...rest}
			render={(props) => {
				if (user !== '' && user && !isloading) {
					return <Component {...props} />;
				} else {
					if (isAuthenticated == null) {
						return <Redirect to='/login'></Redirect>;
					}
				}
			}}
		/>
	);
}

export default ProtectedRoute;
