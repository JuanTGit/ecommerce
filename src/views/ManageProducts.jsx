import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function NewProduct(props) {
	let navigate = useNavigate();

	useEffect(() => {
		if (!props.admin) {
			props.flashMessage(['You do not have access to this page', 'danger']);
			navigate('/');
		}
	}, [props.admin, navigate, props.flashMessage]);

	const createProduct = (e) => {
		e.preventDefault();

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${props.token}`);

		const prodDetails = JSON.stringify({
			"name": e.target.prodName.value,
			"price": parseFloat(e.target.prodPrice.value),
			"image": e.target.imageUrl.value,
			"category_id": parseInt(e.target.category.value, 10)
		});

		fetch(`http://127.0.0.1:5000/api/products`, {
			method: "POST",
			headers: myHeaders,
			body: prodDetails
		})
		.then(res => res.json())
		.then((data) => {
			if (data.error) {
				props.flashMessage([data.error, 'danger'])
			} else {
				props.flashMessage(['Product has been successfully created', 'success'])
			}
		})
		.catch(error => console.log(error, 'There has been an issue creating product'));
	};



// Card Games - cat 1
// Board Games - cat 2

	return(
		<>
			<h1 className="text-center mt-5">Create New Product</h1>
			<form className="justify-content-center d-flex" onSubmit={createProduct}>
				<div className="form-group col-4 mt-3">
						<fieldset>
							<label htmlFor="prodName">Product Name</label>
							<input type="text" name="prodName" className="form-control" placeholder="Product Name" />
						</fieldset>
						<fieldset>
							<label htmlFor="prodPrice">Product Price</label>
							<input type="text" name="prodPrice" className="form-control" placeholder="Product Price" />
						</fieldset>
						<fieldset>
							<label htmlFor="imageUrl">Image URL</label>
							<input type="text" name="imageUrl" className="form-control" placeholder="Image URL" />
						</fieldset>
						<fieldset>
							<label htmlFor="category">Product Category</label>
							<select class="form-control" name="category">
									<option value="1" selected>Card Games</option>
									<option value="2">Board Games</option>
							</select>
						</fieldset>
						<input type="submit" className="btn btn-primary w-100 mt-3" value='Create Product'/>
				</div>
			</form>
		</>
	)
}

export default NewProduct