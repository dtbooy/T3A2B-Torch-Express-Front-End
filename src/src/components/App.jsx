import '../styling/app.css'
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Home from './Home Page/Home'
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
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
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
    return <div>Loading...</div>
  }

  const updateAccessToken = (token) => {
    setAccessToken(token)
    Cookies.set('accessToken', token, { expires: 7 })
  }
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
    return <div>Loading...</div>
  }

  const updateAccessToken = (token) => {
    setAccessToken(token)
    Cookies.set('accessToken', token, { expires: 7 })
  }

  return (
    <Router>
      <NavigationBar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} isAdmin={user.is_admin} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} isAdmin={user.is_admin}/>
      <Container>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route
           
            path="/login"
           
            element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} updateAccessToken={updateAccessToken}  setIsLoggedIn={setIsLoggedIn} setUser={setUser} updateAccessToken={updateAccessToken} />}
        
        />
        <Route path="/register" element={<Register/>}/>


        <Route path="/search" element={<Search/>}/>
        {isLoggedIn ? (
          <Route path="/user" element={<Outlet />}>
            <Route path="mytrips" element={<Mytrips />} />
          </Route>
        ) : null}
<<<<<<< HEAD
        <Route path="/admin" element={<Outlet />}>
          <Route path="services" element={<Services/>}/>
          <Route path="services/new" element={<NewRoute/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="locations" element={<Locations/>}/>
          <Route path="locations/new" element={<NewLocation/>}/>
          <Route path="reservations" element={<Reservations/>}/>
        </Route>
=======
        {isLoggedIn && user.is_admin && (
            <Route path="/admin" element={<Outlet />}>
              <Route path="services" element={<Services />} />
              <Route path="services/new" element={<NewRoute />} />
            </Route>
          )}
>>>>>>> 0dd0e92 (added route protection depending on if user cookies grant login, added a logout button)
        {isLoggedIn ? (
          <Route path="/user" element={<Outlet />}>
            <Route path="mytrips" element={<Mytrips />} />
          </Route>
        ) : null}
        {isLoggedIn && user.is_admin && (
            <Route path="/admin" element={<Outlet />}>
              <Route path="services" element={<Services />} />
              <Route path="services/new" element={<NewRoute />} />
            </Route>
          )}
      </Routes>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App
