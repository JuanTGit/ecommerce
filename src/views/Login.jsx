import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login(props){
	const [redirect, setRedirect] = useState(null)
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const username = e.target.username.value
		const password = e.target.password.value

		let myHeaders = new Headers();
		myHeaders.append('Authorization', "Basic " + btoa(`${username}:${password}`));

		let res = await fetch('http://127.0.0.1:5000/api/token', {
			method: 'POST',
			headers: myHeaders
		})

		let data = await res.json();
		let token = await data.token
		localStorage.setItem('token', token)
		props.flashMessage([`You have successfully logged in ${username}!`, 'success'])
		setRedirect('/')
	}
	return(
		<>
			{redirect ? navigate(redirect) : null}
			<form className="justify-content-center d-flex" onSubmit={handleSubmit}>
				<div className="form-group col-5">
				<h3 className="text-center">Login</h3>
					<fieldset>
						<label htmlFor="username">Username</label>
						<input type="text" name="username" className="form-control" placeholder="Username" />
					</fieldset>
					<fieldset>
						<label htmlFor="password">Password</label>
						<input type="password" name="password" className="form-control" placeholder="Password" />
					</fieldset>
					<input type="submit" className="btn btn-primary mt-3 w-100" value='Login'/>
				</div>
			</form>
		</>
	)
}

export default Login