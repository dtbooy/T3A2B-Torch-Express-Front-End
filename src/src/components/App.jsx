import '../styling/app.css'
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Home from './Home'
import NavigationBar from './NavBar'
import Footer from './Footer'
import '../styling/app.css'
import Login from './Login'
import Register from './Register'
import Services from './Admin Pages/Services/Services'
import NewRoute from './Admin Pages/Services/NewRoute'
import Users from './Admin Pages/Users/Users.jsx'
import Locations from './Admin Pages/Locations/Locations'
import Reservations from './Admin Pages/Reservations/Reservations'
import Search from './Search Page/Search'
import Mytrips from './Mytrips'
import { Container } from 'react-bootstrap'
import UserProfile from './User Profile/UserProfile'


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
        <Route path='/user' element={<Outlet/>}>
          <Route path="mytrips" element={<Mytrips />} />
          <Route path="profile" element={<UserProfile />} /> 
        </Route>
        <Route path="/admin" element={<Outlet />}>
          <Route path="services" element={<Services/>}/>
          <Route path="services/new" element={<NewRoute/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="locations" element={<Locations/>}/>
          <Route path="reservations" element={<Reservations/>}/>
        </Route>
      </Routes>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App
