import { useEffect, useState } from "react"

function Profile(props){
	const userId = localStorage.getItem('userId')
	const [user, setUser] = useState({})

	useEffect(() => {
		fetch(`http://localhost:5000/api/users/${userId}`)
			.then(res => res.json())
			.then(data => setUser(data))
	}, []);

	const updateProfile = (e) => {
		e.preventDefault();

		let currPass = e.target.currPass.value
		let password = e.target.password.value
		let confirm_password = e.target.confirmPass.value

		if (password !== confirm_password) {
			props.flashMessage(["Passwords don't match", "danger"])
			return
		} else {
			let myHeaders = new Headers();
			myHeaders.append('Content-Type', 'application/json');
			myHeaders.append('Authorization', `Bearer ${props.token}`)

			let userData = JSON.stringify({
				currPass: currPass,
				password: password

			});
	
			fetch(`http://localhost:5000/api/users/${userId}`, {
				method: 'PUT',
				headers: myHeaders,
				body: userData
			})
				.then(res => res.json())
				.then(data => {
					if (data.error) {
						props.flashMessage([data.error, 'danger'])
					} else {
						props.flashMessage([data.message, 'success'])
					}
				})
				.catch(error => console.error('Error updating user', error))

		}


	}

	return(
		<>
			<h1 className="text-center mt-5">Edit Profile</h1>

			<h5 className="text-center mt-4">{user.username}</h5>
			<form className="justify-content-center d-flex" onSubmit={updateProfile}>
				<div className="form-group col-4">
						<fieldset>
							<label htmlFor="currPass">Current Password</label>
							<input type="password" name="currPass" className="form-control" placeholder="Current Password" />
						</fieldset>
						<fieldset>
							<label htmlFor="password">Password</label>
							<input type="password" name="password" className="form-control" placeholder="Password" />
						</fieldset>
						<fieldset>
							<label htmlFor="confirmPass">Confirm Password</label>
							<input type="password" name="confirmPass" className="form-control" placeholder="Confirm Password" />
						</fieldset>
						<input type="submit" className="btn btn-primary w-100 mt-3" value='Update Password'/>
				</div>
			</form>
		</>
	)
}

export default Profile