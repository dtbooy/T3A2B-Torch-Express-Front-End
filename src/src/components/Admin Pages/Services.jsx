import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Services = () => {
    const [routeForm, setRouteForm] = useState()
  return (
    <div>
        <h1>Routes</h1>
        <Link to="/admin/services/new"><button>Create New Route</button></Link>
        
    </div>
  )
}

export default Services