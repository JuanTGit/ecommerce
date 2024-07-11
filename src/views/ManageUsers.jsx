import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ManageUsers(props){

	let navigate = useNavigate();

	const [userList, setUserList] = useState([])
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredUsers, setFilteredUsers] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:5000/api/users`)
			.then(res => res.json())
			.then(data => {
				setUserList(data); 
				setFilteredUsers(data)
			});
	}, []);

	useEffect(() => {
		if (!props.admin) {
			props.flashMessage(['You do not have access to this page', 'danger']);
			navigate('/');
		}
	}, [props.admin, navigate, props.flashMessage]);

	useEffect(() => {
		const results = userList.filter(user =>
			user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredUsers(results);
	}, [searchTerm, userList]);

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
		.then((data) => {
			if (data.error) {
				props.flashMessage([data.error, 'danger'])
			} else {
				setUserList(prevList => prevList.filter(u => u.id !== user));
				setFilteredUsers(prevList => prevList.filter(u => u.id !== user));
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
				<input
					type="text"
					className="form-control mb-4"
					placeholder="Search for users..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
					<div className="list-group">
						{filteredUsers.map(user => (
							<div key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
								Username: {user.username} || Email: {user.email}
								<button className="btn btn-danger w-25" onClick={handleDeleteUser} id={user.id}>Delete User</button>
							</div>
						))}

					</div>

				</div>
			</div>
		</div>
	)
}

export default ManageUsers