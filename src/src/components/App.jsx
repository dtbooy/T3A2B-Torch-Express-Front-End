import '../styling/app.css'
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Home from './Home'
import NavigationBar from './NavBar'
import Footer from './Footer'
import '../styling/app.css'
import Login from './Login'
import Register from './Register'
import Search from './Search'
import Services from './Admin Pages/Services'
import NewRoute from './Admin Pages/NewRoute'
import Users from './Admin Pages/Users'
import Locations from './Admin Pages/Locations'
import Reservations from './Admin Pages/Reservations'

function App() {

  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/admin" element={<Outlet />}>
          <Route path="services" element={<Services/>}/>
          <Route path="services/new" element={<NewRoute/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="locations" element={<Locations/>}/>
          <Route path="reservations" element={<Reservations/>}/>
        </Route>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
