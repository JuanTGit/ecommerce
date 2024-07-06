import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function Product(props){
	const [boardGames, setBoardGames] = useState([]);
	const [cardGames, setCardGames] = useState([]);

	useEffect(() => {
		fetch('http://127.0.0.1:5000/api/products')
			.then(res => res.json())
			.then(data => {
				const filterCardGames = data.filter(product => product.category_id === 1);
				setCardGames(filterCardGames);

				const filterBoardGames = data.filter(product => product.category_id === 2);
				setBoardGames(filterBoardGames);
			})
			.catch(error => console.error('Error fetching products', error));
	}, []);



	return(
		<>	
			<h3 className="text-center">Products</h3>
			<h3 className="text-center m-5">Card Games</h3>
			<div className="d-flex justify-content-center">
				<div className="row">
					{cardGames.map(product => <ProductCard prod={product} key={product.id} /> )}
				</div>
			</div>
			<h3 className="text-center m-5">Board Games</h3>
			<div className="d-flex justify-content-center">
				<div className="row">
					{boardGames.map(product => <ProductCard prod={product} key={product.id} /> )}
				</div>
			</div>

		</>
	)
}

export default Product;