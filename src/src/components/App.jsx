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
import Mytrips from './Mytrips'
import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState([])
  const [accessToken, setAccessToken] = useState('')


  useEffect(() =>  {
    const token = Cookies.get('accessToken')
    const user = Cookies.get('userData')
    if (token && user) {
      setUser(user)
      setAccessToken(token)
      setIsLoggedIn(true)
    }
  }, [])

  const updateAccessToken = (token) => {
    setAccessToken(token)
    Cookies.set('accessToken', token, { expires: 7 })
  }

  return (
    <Router>
      <NavigationBar isLoggedIn={isLoggedIn}/>
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
            <Route path="mytrips" element={<Mytrips />} />
          </Route>
        ) : null}
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
