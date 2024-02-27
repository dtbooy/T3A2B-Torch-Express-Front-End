import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { FaMapMarkedAlt } from "react-icons/fa";

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
          <Accordion.Item eventKey={index} className="accordion-item mb-3">
            <Accordion.Header>{loc.name}</Accordion.Header>
            <Accordion.Body className="text-center">
              <p>Address: {loc.address}</p>
              <a
                href={`https://www.google.com/maps?q=${loc.address.split(', ').join('+')}`}
                target="_blank"
                rel="noopener noreferrer"
              ><FaMapMarkedAlt className="map-link"/>
              </a>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  )
}

export default Locations