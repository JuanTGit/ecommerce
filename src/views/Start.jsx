import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard";
import { useEffect, useRef, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";

function Start(){
	const [prod, setProd] = useState({})
	const scrollRef = useRef(null);

	const scrollToSection = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: 'smooth'});
		}
	}


	useEffect(() => {
		fetch(`http://localhost:5000/api/products`)
			.then(res => res.json())
			.then(data => setProd(data))
	},[])

	return(
		<>
			<div className="d-flex justify-content-center overflow-hidden" id="container-xl">
				<img src="/src/assets/images/gate.jpg" className="img-lg" alt="..."/>
				<div className="text-on-image text-center text-white">
					<h1 className="display-4 fs-2 mt-5 text-nowrap">Make game night</h1>
					<h1 className="display-4 fs-2">EASY</h1>
				</div>
				<div className="btn-on-image text-center">
					<Link to="/home" className="btn btn-danger btn-md mt-4 w-100"><strong>View our Products</strong></Link>
					<div id="list-example" className="list-group mt-4">
						<BsChevronDoubleDown className="scroll-btn btn bg-light btn-outline-circle" onClick={scrollToSection}/>
					</div>
				</div>
			</div>
			<h3></h3>
		</>
	)
}

export default Start;