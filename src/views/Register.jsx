
function Register(){
	return(
		<>
			<h3 className="text-center">Register Here</h3>
			<form className="justify-content-center d-flex">
				<div className="form-group col-10">
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