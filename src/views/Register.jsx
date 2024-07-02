import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register(props){
	let navigate = useNavigate();

	const handleSubmit = (e) =>{
		e.preventDefault();
		// console.log(e)

		// Confirm the passwords are equal
		let password = e.target.password.value;
		let confirmPass = e.target.confirmPass.value;
		if (password !== confirmPass){
			props.flashMessage(['The passwords are not the same', 'danger'])
			navigate('/register')
		} else {

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
					props.flashMessage(['Thank you for registering.', 'success'])
					navigate('/')
				})
			}

	}


	return( 
		<>
			<h3 className="text-center">Register Here</h3>
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