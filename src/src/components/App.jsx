import '../styling/app.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home'
import NavigationBar from './NavBar'
import Footer from './Footer'
import '../styling/app.css'
import Login from './Login'
import Register from './Register'

function App() {

  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
