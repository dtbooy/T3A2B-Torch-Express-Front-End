import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Button } from 'react-bootstrap'

const Logout = ({ setIsLoggedIn }) => {
  const nav = useNavigate()

  const handleLogout = () => {
    // Clear user authentication data
    Cookies.remove('accessToken')
    Cookies.remove('userData')
    setIsLoggedIn(false)

    // Redirect to login page
    nav('/login')
  }

  return (
    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
  )
}

export default Logout