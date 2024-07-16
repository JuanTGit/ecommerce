import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Cart(props){
	const navigate = useNavigate();
	const [items, setItems] = useState([])


	useEffect(() => {
		if (!props.token) {
			props.flashMessage(['Please login to view cart', 'warning']);
			navigate("/login");
		}
	}, [props.token, props.flashMessage, navigate])

	useEffect(() => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${props.token}`);

		fetch(`http://localhost:5000/api/view-cart`, {
			method: "GET",
			headers: myHeaders
		})
		.then(res => res.json())
		.then(data => setItems(data.items))
	},[])
	console.log(items)

	if (!props.token){
		return null;
	}

	return(
		<>
			<h1 className="text-center mt-5">Cart Items</h1>
			<ul className="row">
				{items.map(item => 
						<li>{item.product_name}</li>
				)}
			</ul>
		</>
	)
}

export default Cart