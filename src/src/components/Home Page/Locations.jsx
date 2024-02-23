import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'

const Locations = () => {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        fetch("http://localhost:4001/locations")
          .then((res) => res.json())
          .then((data) => setLocations(data))
      }, [])
  return (
    <>
    {locations.map((loc, index) => (
        <Accordion key={index} defaultActiveKey={loc.name}>
          <Accordion.Item eventKey={index}>
            <Accordion.Header>{loc.name}</Accordion.Header>
            <Accordion.Body>
              <p>Address: {loc.address}</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  )
}

export default Locations