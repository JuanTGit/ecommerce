import Navbar from './components/Navbar'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AlertMessage from './components/AlertMessage'
import { useState } from 'react'
import Profile from './views/Profile'
import Product from './views/Products'
import ProductUpdate from './components/ProductUpdate'
import Start from './views/Start'
import PrivateRoute from './components/PrivateRoute'

function App() {

	const [message, setMessage] = useState([null, null])
	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'))
	const [username, setUsername] = useState(localStorage.getItem('username'))

	const flashMessage = ([message, category='primary']) => {
		setMessage([message, category])
	}

	const logIn = (token, username) => {
		setLoggedIn(token)
		setUsername(username)
	}

	const logOut = () => {
		flashMessage(['You have been logged out'])
		localStorage.removeItem('token')
		localStorage.removeItem('userId')
		localStorage.removeItem('username')
		setLoggedIn(null)
		setUsername(null)
	}

	return (
		<>
			<Router>
				<Navbar loggedIn={loggedIn} logUserOut={logOut} flashMessage={flashMessage} username={username} />
					{message[0] != null ? <AlertMessage message={message[0]} category={message[1]} flashMessage={flashMessage} /> : null }
					<Routes>
						<Route path='/' element={<Start/>} />
						<Route path='home' element={<Home/>}/>
						<Route path='register' element={<Register flashMessage={flashMessage} />}/>
						<Route path='login' element={<Login flashMessage={flashMessage} logUserIn={logIn} />}/>
						<Route path='profile' element={<PrivateRoute element={Profile} token={loggedIn} flashMessage={flashMessage} />} />
						<Route path='products' element={<Product />} />
						<Route path='products/:prodId' element={<ProductUpdate token={loggedIn} flashMessage={flashMessage}/>} />
					</Routes>
			</Router>
		</>
	)
}

export default App
