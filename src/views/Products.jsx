import { useState, useEffect } from "react"

function Product(props){
	const [products, setProducts] = useState([])
	useEffect(() => {
		fetch('http://127.0.0.1:5000/api/products')
			.then(res => res.json())
			.then(data => setProducts(data))
	}, []);



	return(
		<>	
			<h3 className="text-center">Products</h3>
			<div className="d-flex justify-content-center">
				<ul>
					{products.map(product => (
						<li key={product.id}>{product.prod_name}</li>
					))}
				</ul>
			</div>

		</>
	)
}

export default Product