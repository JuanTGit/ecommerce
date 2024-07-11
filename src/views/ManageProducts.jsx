import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function NewProduct(props) {
	let navigate = useNavigate();

	useEffect(() => {
		if (!props.admin) {
			props.flashMessage(['You do not have access to this page', 'danger']);
			navigate('/');
		}
	}, [props.admin, navigate, props.flashMessage]);

	return(
		<>
			<h1 className="text-center">Create New Product</h1>
		</>
	)
}

export default NewProduct