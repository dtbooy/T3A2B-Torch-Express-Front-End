import '../styling/app.css'
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Home from './Home'
import NavigationBar from './NavBar'
import Footer from './Footer'
import '../styling/app.css'
import Login from './Login'
import Register from './Register'
import Search from './Search Page/Search'
import Services from './Admin Pages/Services'
import NewRoute from './Admin Pages/NewRoute'
import { Container } from 'react-bootstrap'

function App() {

  return (
    <Router>
      <NavigationBar/>
      <Container>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/admin" element={<Outlet />}>
          <Route path="services" element={<Services/>}/>
          <Route path="services/new" element={<NewRoute/>}/>
        </Route>
      </Routes>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App
