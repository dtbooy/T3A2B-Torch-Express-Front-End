import React from 'react'

const LocationRow = ({location}) => {
  return (
    <>
        <td>{location.name}</td>
            <td>{location.address}</td>
            <td>{location.directions}</td>
    </>
  )
}

export default LocationRow