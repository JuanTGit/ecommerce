import { Link } from "react-router-dom";

function ProductCard(props) {
	const { prod } = props;
	
	return (
			<div className='col-6 col-sm-4'>
				<div className="card">
					<img src={prod.image} className="card-img-top" alt="..."/>
					<div className="card-body">
						<h5 className="card-title">{prod.name}</h5>
						<p className="card-text">{prod.price}</p>
						<Link to={`/products/${prod.id}`} className="btn btn-primary">More Info</Link>
					</div>
				</div>
			</div>
	)
}

export default ProductCard