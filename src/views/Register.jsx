import { useState } from "react";
import { Navigate } from "react-router-dom";


function Register(){
	const [redirect, setRedirect] = useState(null);
	const [errorMessage, setErrorMessage] = useState('')

	const handleSubmit = (e) =>{
		e.preventDefault();
		// console.log(e)

		// Confirm the passwords are equal
		let password = e.target.password.value;
		let confirmPass = e.target.confirmPass.value;
		if (password !== confirmPass){
			console.log('The passwords are not the same');
			setErrorMessage('Passwords do not match')
			return;
		}

		// Set up request to create new user endpoint
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		let data = JSON.stringify({
			username: e.target.username.value,
			email: e.target.email.value,
			password: password,
			confirm_password: confirmPass
		});

		fetch('http://127.0.0.1:5000/api/users', {
			method: 'POST',
			headers: myHeaders,
			body: data
		}).then(res => res.json())
			.then(data => {
				console.log(data)
				setRedirect("/")
			})

	}


	return(
		redirect ? <Navigate to={redirect} /> : 
		<>
			<h3 className="text-center">Register Here</h3>
			{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
			<form className="justify-content-center d-flex" onSubmit={handleSubmit}>
				<div className="form-group col-4">
						<fieldset>
							<label htmlFor="username">Username</label>
							<input type="text" name="username" className="form-control" placeholder="Username" />
						</fieldset>
						<fieldset>
							<label htmlFor="email">Email</label>
							<input type="email" name="email" className="form-control" placeholder="Email" />
						</fieldset>
						<fieldset>
							<label htmlFor="password">Password</label>
							<input type="password" name="password" className="form-control" placeholder="Password" />
						</fieldset>
						<fieldset>
							<label htmlFor="confirmPass">Confirm Password</label>
							<input type="password" name="confirmPass" className="form-control" placeholder="Confirm Password" />
						</fieldset>
						<input type="submit" className="btn btn-primary w-100 mt-3" value='Register'/>
				</div>
			</form>
		</>
	)
}

export default Register