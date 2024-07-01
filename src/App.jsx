import Navbar from './components/navbar'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

	return (
		<>
			<Router>
				<Navbar />
					<Routes>
						<Route path='/' element={<Home/>}/>
						<Route path='/register' element={<Register/>}/>
						<Route path='/login' element={<Login/>}/>
					</Routes>
			</Router>
		</>
	)
}

export default App
