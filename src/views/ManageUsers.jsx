import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ManageUsers(props){

	let navigate = useNavigate();

	const [userList, setUserList] = useState([])

	useEffect(() => {
		fetch(`http://localhost:5000/api/users`)
			.then(res => res.json())
			.then(data => setUserList(data))
	}, [])

	useEffect(() => {
		if (!props.admin) {
			props.flashMessage(['You do not have access to this page', 'danger']);
			navigate('/');
		}
	}, [props.admin, navigate, props.flashMessage]);

	const handleDeleteUser = (e) => {
		e.preventDefault();
		let user = e.target.id

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${props.token}`)

		fetch(`http://127.0.0.1:5000/api/users/${user}`, {
			method: 'DELETE',
			headers: myHeaders
		})
		.then(res => res.json())
		.then(data => {
			if (data.error) {
				props.flashMessage([data.error, 'danger'])
			} else {
				navigate('/manage-usersced')
				props.flashMessage([data.message, 'success'])
			}
		})
		.catch(error => {
			console.error('Error deleting user', error);
			props.flashMessage(['Error deleting user. Please try again.', 'danger']);
		});
	}


	return(
		<div className="container">
			<h1 className="text-center">Manage Users</h1>
			<div className="row justify-content-center mt-4">
				<div className="col-md-8">
					<div className="list-group">
						{userList.map(user => (
							<div key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
								Username: {user.username} || Email: {user.email}
								<button className="btn btn-danger w-25" onClick={handleDeleteUser} id={user.id}>Delete</button>
							</div>
						))}

					</div>

				</div>
			</div>
		</div>
	)
}

export default ManageUsers