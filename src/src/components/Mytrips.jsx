import { useEffect, useState } from "react"
import { Card, Button } from 'react-bootstrap'
import QRCode from "react-qr-code"
import '../styling/Mytrip.css'
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"

const Mytrips = () => {
  const params = useParams()
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4001/users/${params.userId}/reservations/`, {
      headers: {'Authorization': Cookies.get("accessToken")}
    })
        .then(res => res.json())
        .then(data => setReservations(data))
        .catch(error => console.error('Error fetching Reservations:', error))
    
}, []) 


  const cancelReservation = async id => {
    try {
      await fetch(`http://localhost:4001/reservations/${id}`, { 
        method: 'delete', 
        headers: {'Authorization': Cookies.get("accessToken")}
      }) 
      // console.log(id)
      setReservations(prevReservations => prevReservations.filter(reservation => reservation._id !== id)) 
    } catch (error) {
      console.error('Error canceling reservation:', error) 
    }
  }

if(reservations.length === 0){
  return<></>
}else{
  // console.log(reservations)
  return (
    <>
      <h1>My Trips</h1>
      <div className="card-container">
        {reservations.map((reservation) => (
          
          <Card key={reservation._id}>
            
            <Card.Body>
              <Card.Title>Reservation for {new Date(reservation?.busService?.collectionTime).toLocaleDateString('en-GB', { day: '2-digit', month: 'long' })}</Card.Title>
              <div className="card-body">
                <div>
                  <Card.Text>
                    Passenger: {reservation.user.name}
                    <br />
                    Event: {reservation?.busService?.eventName}
                    <br />
                    Route: {reservation?.busService?.pickupLocation?.name} - {reservation?.busService?.dropoffLocation?.name}
                    <br />
                    Collection Time: {new Date(reservation?.busService?.collectionTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </Card.Text>
                </div>
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                    <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={reservation._id}
                    viewBox={`0 0 256 256`}
                    />
                </div>
              </div>
              <div className="btn-group">
              <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Cancel Booking
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item disabled"  href="#">Are you sure?</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" onClick={() => cancelReservation(reservation._id)} href="#">Confirm Cancellation</a></li>
              </ul>
            </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}
}
export default Mytrips