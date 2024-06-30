
function Login(){
	return(
		<>
			<form>
				<div className="form-group">
					<fieldset>
						<label htmlFor="username">Username</label>
						<input type="text" name="username" className="form-control" placeholder="Username" />
					</fieldset>
					<fieldset>
						<label htmlFor="password">Password</label>
						<input type="password" name="password" className="form-control" placeholder="Password" />
					</fieldset>
					<input type="submit" className="btn btn-primary" value='Login'/>
				</div>
			</form>
		</>
	)
}

export default Login