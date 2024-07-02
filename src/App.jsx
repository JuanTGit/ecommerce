import Navbar from './components/navbar'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AlertMessage from './components/AlertMessage'
import { useState } from 'react'

function App() {

	const [message, setMessage] = useState([null, null])

	const flashMessage = ([message, category='primary']) => {
		setMessage([message, category])
	}

	return (
		<>
			<Router>
				<Navbar />
				<div className='container'>
					{message[0] != null ? <AlertMessage message={message[0]} category={message[1]} flashMessage={flashMessage} /> : null }
					<Routes>
						<Route path='/' element={<Home/>}/>
						<Route path='/register' element={<Register flashMessage={flashMessage}/>}/>
						<Route path='/login' element={<Login/>}/>
					</Routes>
				</div>
			</Router>
		</>
	)
}

export default App
