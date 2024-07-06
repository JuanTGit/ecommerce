import { Navigate } from "react-router-dom"

const PrivateRoute = ({ element: Element, token, ...rest}) => {
	return token ? <Element token={token} {...rest} /> : <Navigate to="/login"/> ;
}

export default PrivateRoute;