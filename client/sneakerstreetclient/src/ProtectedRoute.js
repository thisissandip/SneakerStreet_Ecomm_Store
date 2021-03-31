import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, ...rest }) {
	const user = useSelector((state) => state.authR.user);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (user !== '') {
					return <Component {...props} />;
				} else {
					return <Redirect to='login'></Redirect>;
				}
			}}
		/>
	);
}

export default ProtectedRoute;
