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

	const flashMessage = ([message, category='primary']) => {
		setMessage([message, category])
	}

	const logIn = (token) => {
		setLoggedIn(token)
	} 

	const logOut = () => {
		flashMessage(['You have been logged out'])
		localStorage.removeItem('token')
		localStorage.removeItem('userId')
		setLoggedIn(null)
	}

	return (
		<>
			<Router>
				<Navbar loggedIn={loggedIn} logUserOut={logOut} flashMessage={flashMessage} />
					{message[0] != null ? <AlertMessage message={message[0]} category={message[1]} flashMessage={flashMessage} /> : null }
					<Routes>
						<Route path='/' element={<Start/>} />
						<Route path='home' element={<Home/>}/>
						<Route path='register' element={<Register flashMessage={flashMessage} />}/>
						<Route path='login' element={<Login flashMessage={flashMessage} logUserIn={logIn} />}/>
						<Route path='profile' element={<PrivateRoute element={Profile} token={loggedIn} flashMessage={flashMessage} />} />
						{/* <Route path='profile' element={<Profile token={loggedIn} flashMessage={flashMessage} />} /> */}
						<Route path='products' element={<Product />} />
						<Route path='products/:prodId' element={<ProductUpdate token={loggedIn} flashMessage={flashMessage}/>} />
					</Routes>
			</Router>
		</>
	)
}

export default App
