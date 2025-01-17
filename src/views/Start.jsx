import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard";
import { useEffect, useRef, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import gateImage from '../assets/images/gate.jpg'

function Start(props){
	const apiUrl = import.meta.env.VITE_API_URL;
	const [prod, setProd] = useState([])
	const scrollRef = useRef(null);

	const scrollToSection = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: 'smooth'});
		}
	}


	useEffect(() => {
		fetch(`${apiUrl}/api/products`)
			.then(res => res.json())
			.then(data => {
				setProd(data.slice(0, 4))})
	},[])

	return(
		<>
			<div className="d-flex justify-content-center overflow-hidden" id="container-xl">
				<img src={gateImage} className="img-lg" alt="gate"/>
				<div className="text-on-image text-center text-white">
					<h1 className="display-4 fs-2 mt-5 text-nowrap">Make game night</h1>
					<h1 className="display-4 fs-2">EASY</h1>
				</div>
				<div className="btn-on-image text-center">
					<Link to="/products" className="btn btn-danger btn-md mt-4 w-100"><strong>View our Products</strong></Link>
					<div id="list-example" className="list-group mt-4">
						<BsChevronDoubleDown className="scroll-btn btn bg-light btn-outline-circle" onClick={scrollToSection}/>
					</div>
				</div>
			</div>
			<div className="container">
				<h3 className="text-center fs-1 my-5" ref={scrollRef}>Featured</h3>
				<div className="row">
					{prod.map(product => <ProductCard prod={product} key={product.id} flashMessage={props.flashMessage}/>)}
				</div>
			</div>
		</>
	)
}

export default Start;