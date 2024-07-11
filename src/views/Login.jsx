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

		if (res.ok){
			let data = await res.json();
			let { user, name, token, admin } = {
				user: await data.userId,
				name: await data.username,
				token: await data.token,
				admin: await data.is_admin
			}

			localStorage.setItem('token', token)
			localStorage.setItem('userId', user)
			localStorage.setItem('username', name)
			localStorage.setItem('admin', admin)
			props.flashMessage([`You have successfully logged in ${username}!`, 'success'])
			props.logUserIn(token, name, admin)
			setRedirect('/')
		} else {
			props.flashMessage(['Invalid username or password', 'danger'])
		}
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