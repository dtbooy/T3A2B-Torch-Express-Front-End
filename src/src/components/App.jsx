import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Home from './Home Page/Home'
import NavigationBar from './NavBar'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import Services from './Admin Pages/Services/Services'
import NewRoute from './Admin Pages/Services/NewRoute'
import Users from './Admin Pages/Users/Users.jsx'
import Locations from './Admin Pages/Locations/Locations'
import Reservations from './Admin Pages/Reservations/Reservations'
import Search from './Search Page/Search'
import Mytrips from './Mytrips'
import { Container, Spinner } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import UserProfile from './User Profile/UserProfile'
import NewLocation from './Admin Pages/Locations/NewLocation.jsx'



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState([])
  const [accessToken, setAccessToken] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('accessToken')
        const userData = Cookies.get('userData')

        if (token && userData) {
          setUser(JSON.parse(userData))
          setAccessToken(token)
          setIsLoggedIn(true)
          let userId = user._id
        }
        setIsInitialized(true) // Set initialization status to true after fetching data
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  if (!isInitialized) {
    // Render loading indicator or placeholder while fetching data
    return <div className="loading-bar"><Spinner animation="border" variant="warning" /></div>
  }

  const updateAccessToken = (token) => {
    setAccessToken(token)
    Cookies.set('accessToken', token)
  }

  const updateUserCookie = (userData) => {
    Cookies.set('userData', JSON.stringify(userData))
    console.log('Updated user cookie')
  }

  return (
    <Router>
      <NavigationBar setIsLoggedIn={setIsLoggedIn} user={user} isLoggedIn={isLoggedIn} isAdmin={user.is_admin}/>
      <Container>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route
           
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} updateAccessToken={updateAccessToken} />}
        />
        <Route path="/register" element={<Register/>}/>
        <Route path="/search" element={<Search/>}/>
        {isLoggedIn ? (
          <Route path="/user" element={<Outlet />}>
            <Route path={':userId/mytrips/'} element={<Mytrips />} />
            <Route path={":userId/profile"} element={<UserProfile user={user} setUser={setUser} updateUserCookie={updateUserCookie} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
          </Route>
        ) : null}
        {isLoggedIn && user.is_admin && (
            <Route path="/admin" element={<Outlet />}>
              <Route path="services" element={<Services />} />
              <Route path="services/new" element={<NewRoute accessToken={accessToken}/>} />
              <Route path="users" element={<Users/>}/>
              <Route path="locations" element={<Locations/>}/>
              <Route path="locations/new" element={<NewLocation/>}/>
              <Route path="reservations" element={<Reservations/>}/>
            </Route>
          )}
      </Routes>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App
