import Navbar from './components/Navbar'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AlertMessage from './components/AlertMessage'
import { useEffect, useState } from 'react'
import Profile from './views/Profile'
import Product from './views/Products'
import ProductUpdate from './components/ProductUpdate'
import Start from './views/Start'
import PrivateRoute from './components/PrivateRoute'

function App() {

	const [message, setMessage] = useState([null, null])

	const [user, setUser] = useState({
		loggedIn: localStorage.getItem('token'),
		username: localStorage.getItem('username'),
		admin: localStorage.getItem('admin')
	})

	const flashMessage = ([message, category='primary']) => {
		setMessage([message, category])
	}

	const logIn = (token, username, admin) => {
		setUser({loggedIn: token, username, admin})
	}

	const logOut = () => {
		flashMessage(['You have been logged out'])
		localStorage.clear();
		setUser({ loggedIn: null, username: null, admin: null })
	}
 
	return (
		<>
			<Router>
				<Navbar loggedIn={user.loggedIn} logUserOut={logOut} flashMessage={flashMessage} username={user.username} admin={user.admin}/>
					{message[0] != null ? <AlertMessage message={message[0]} category={message[1]} flashMessage={flashMessage} /> : null }
					<Routes>
						<Route path='/' element={<Start/>} />
						<Route path='home' element={<Home/>}/>
						<Route path='register' element={<Register flashMessage={flashMessage} />}/>
						<Route path='login' element={<Login flashMessage={flashMessage} logUserIn={logIn} />}/>
						<Route path='profile' element={<PrivateRoute element={Profile} token={user.loggedIn} flashMessage={flashMessage} />} />
						<Route path='products' element={<Product />} />
						<Route path='products/:prodId' element={<ProductUpdate token={user.loggedIn} flashMessage={flashMessage}/>} />
					</Routes>
			</Router>
		</>
	)
}

export default App
