/*import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const location = useLocation();
	const token = document.cookie
		.split("; ")
		.find((row) => row.startsWith("jwt="))
		?.split("=")[1];

	return token ? (
		<Component {...rest} />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

ProtectedRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;*/

import { useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts";

const ProtectedRoute = ({ children }) => {
	const location = useLocation();
	const { isLoggedIn } = useContext(AuthContext);

	return isLoggedIn ? (
		children
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default ProtectedRoute;

