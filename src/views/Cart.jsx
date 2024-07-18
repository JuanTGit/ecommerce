import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Cart(props){
	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const [items, setItems] = useState([])
	const [cartTotal, setCartTotal] = useState(0);




	useEffect(() => {
		if (!props.token) {
			props.flashMessage(['Please login to view cart', 'warning']);
			navigate("/login");
		}
	}, [props.token, props.flashMessage, navigate])

	useEffect(() => {
		const fetchCart = async () => {
			const myHeaders = new Headers();
			myHeaders.append("Authorization", `Bearer ${props.token}`);
			
			const response = await fetch(`${apiUrl}/api/view-cart`, {
				method: "GET",
				headers: myHeaders
			})

			if (response.ok) {
				let data = await response.json()
				console.log(data)
				
				let flaskTotal = data.cart_total
	
				setCartTotal(flaskTotal);
				setItems(data.items)
			} else {
				console.error('Failed to fetch cart data:', response.statusText)
			}
		}

		fetchCart();
		},[props.token])
		console.log(items)


	if (!props.token){
		return null;
	}

	return(
		<>
			<h1 className="text-center mt-5">Cart Items</h1>
				<div className="row d-flex justify-content-center">
					<div className="mt-5 col-6">
						<ul className="row">
									<div className="col-5 card-body" id="cart-prod-name">
										Name
									</div>
									<div className="col-3 card-body" id="cart-prod-name">
										Quantity
									</div>
									<div className="col-3 card-body" id="cart-prod-name">
										Price
									</div>
									<div className="col-1 card-body" id="cart-prod-name">
										Total
									</div>
							{items.map(item =>
							<div class="card" key={item.product_id}>
								<div class="card-body row">
									<div className="col-5" id="cart-prod-name">
										{item.product_name}
									</div>
									<div className="col-3" id="cart-prod-name">
										{item.quantity}
									</div>
									<div className="col-3" id="cart-prod-name">
										{item.price}
									</div>
									<div className="col-1" id="cart-prod-name">
										{item.total_price}
									</div>
								</div>
						  	</div>
							)}
						</ul>
					</div>
					<div className="mt-5 col-5">
						<h3 className="text-center">Total</h3>
						<h5 className="text-center">{cartTotal}</h5>
					</div>
				</div>
		</>
	)
}

export default Cart