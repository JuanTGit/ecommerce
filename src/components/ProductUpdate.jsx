import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductUpdate(props){
	const { prodId } = useParams();
	const [prod, setProd] = useState({});
	useEffect(() => {
		fetch(`http://127.0.0.1:5000/api/products/${prodId}`)
			.then(res => res.json())
			.then(data => setProd(data))
	}, [])

	return(
		<div>
			<h3 className="text-center">Product</h3>
			<div className="card w-50">
					<img src={prod.image} className="card-img-top" alt="..."/>
					<div className="card-body">
						<h5 className="card-title">{prod.name}</h5>
						<p className="card-text">{prod.price}</p>
					</div>
				</div>
		</div>
	)
}

export default ProductUpdate