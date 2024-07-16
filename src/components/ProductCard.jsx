import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
	const { prod, flashMessage } = props;
	const navigate = useNavigate();
	
	const handleAddToCart = (e) => {
		e.preventDefault();
		let token = localStorage.getItem('token')
		let product = prod.id
		
		if (token){
			let myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("Authorization", `Bearer ${token}`);
	
			let cartItem = JSON.stringify({
				'product_id': product,
				'quantity': 1
			})
	
			fetch(`http://127.0.0.1:5000/api/add-to-cart`, {
				method: "POST",
				headers: myHeaders,
				body: cartItem
			})
			.then(res => res.json())
			.then(data => {
				if (data.error) {
					flashMessage('Error adding item to cart!', 'danger');
				} else {
					flashMessage(data.message, 'success');
				}
			})
			.catch(err => { flashMessage('Something went wrong!', 'danger') })
		} else {
			flashMessage(['Please login to add items to your cart', 'warning'])
			navigate('/login')
		}
	}
	
	return (
			<div className='col-12 col-sm-3'>
				<div className="card">
					<img src={prod.image} className="card-img-top" alt="..."/>
					<div className="card-body">
						<h5 className="card-title">{prod.name}</h5>
						<p className="card-text">{prod.price}</p>
						<Link to={`/products/${prod.id}`} className="btn btn-primary me-2">More Info</Link>
						<button className="btn btn-warning" onClick={handleAddToCart}>Add to Cart</button>
					</div>
				</div>
			</div>
	)
}

export default ProductCard