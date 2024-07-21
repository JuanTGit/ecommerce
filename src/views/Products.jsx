import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function Product(props){
	const apiUrl = import.meta.env.VITE_API_URL;
	const [boardGames, setBoardGames] = useState([]);
	const [cardGames, setCardGames] = useState([]);
	const [ allGames, setAllGames] = useState([]);

	useEffect(() => {
		fetch(`${apiUrl}/api/products`)
			.then(res => res.json())
			.then(data => {
				setAllGames(data);

				const filterCardGames = data.filter(product => product.category_id === 1);
				setCardGames(filterCardGames);

				const filterBoardGames = data.filter(product => product.category_id === 2);
				setBoardGames(filterBoardGames);
			})
			.catch(error => console.error('Error fetching products', error));
	}, []);



	return(
		<div className="container">	
			<h3 className="text-center">Products</h3>
			<h3 className="text-center m-5">Card Games</h3>
				<div className="row d-flex justify-content-center">
					{cardGames.map(product => <ProductCard prod={product} key={product.id} flashMessage={props.flashMessage}/> )}
				</div>
			<h3 className="text-center m-5">Board Games</h3>
				<div className="row d-flex justify-content-center">
					{boardGames.map(product => <ProductCard prod={product} key={product.id} flashMessage={props.flashMessage}/> )}
				</div>

		</div>
	)
}

export default Product;