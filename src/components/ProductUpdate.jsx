import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductUpdate(props){
	const apiUrl = import.meta.env.VITE_API_URL;
	const { prodId } = useParams();
	const [prod, setProd] = useState({});
	const navigate = useNavigate();
	useEffect(() => {
		fetch(`${apiUrl}/api/products/${prodId}`)
			.then(res => res.json())
			.then(data => setProd(data))
	}, [])

	const handleDelete = () => {
		let myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${props.token}`)

		fetch(`${apiUrl}/api/products/${prodId}`, {
			method: "DELETE",
			headers: myHeaders
		})
			.then(res => res.json())
			.then(data => {
				if (data.error){
					props.flashMessage([data.error, 'danger'])
				} else {
					props.flashMessage([data.message, 'warning'])
					navigate('/products')
				}
			})
			.catch(err => {
				props.flashMessage(['Failed to delete product', 'danger']);
			});
		};
	
	return(
		<div>
			<h3 className="text-center">Product</h3>
			<div className="card w-50">
					<img src={prod.image} className="card-img-top" alt="..."/>
					<div className="card-body">
						<h5 className="card-title">{prod.name}</h5>
						<p className="card-text">{prod.price}</p>
						<button className="btn btn-danger" onClick={handleDelete}>Delete</button>
					</div>
				</div>
		</div>
	)
}

export default ProductUpdate