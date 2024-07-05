import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard";

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
				<div className="row">
					{products.map(product => <ProductCard prod={product} key={product.id} /> )}
				</div>
			</div>

		</>
	)
}

export default Product