import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const PrivateRoute = ({ element: Element, IsisLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      element={IsisLoggedIn ? <Element /> : <Navigate to="/login" />}
    />
  )
}

export default PrivateRoute
