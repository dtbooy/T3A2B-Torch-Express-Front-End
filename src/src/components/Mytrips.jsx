import { useEffect, useState } from "react"
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import QRCode from "react-qr-code"
import { useParams } from "react-router-dom"
import DeleteModal from "./Admin Pages/DeleteModal"
import '../styling/reservationpage.scss'

const Mytrips = () => {
  const params = useParams()
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4001/users/${params.userId}/reservations/`)
      .then(res => res.json())
      .then(data => {
        setReservations(data)
        console.log(data)
      })
      .catch(error => console.error('Error fetching Reservations:', error))

  }, [])


  const cancelReservation = async id => {
    try {
      await fetch(`http://localhost:4001/reservations/${id}`, { method: 'delete' })
      console.log(id)
      setReservations(prevReservations => prevReservations.filter(reservation => reservation._id !== id))
    } catch (error) {
      console.error('Error canceling reservation:', error)
    }
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState(null)

    const handleDeleteConfirmation = (id) => {
        setSelectedItemId(id)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = () => {
      cancelReservation(selectedItemId)
        setShowDeleteModal(false)
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
    }

  if (reservations.length === 0) {
    return (<>
      <h1>My Trips</h1>
      <h2>No Reservations</h2>
    </>)
  } else {
    return (
      <>
      <h1 className="page-heading">My Trips</h1>
      <Container className="d-flex flex-wrap justify-content-evenly">
          {reservations.map((reservation) => (
            <Card key={reservation._id} className="reservation-card mb-3">
              <Card.Body>
              <Card.Img src="/Torch Transit.png"></Card.Img>
              <Card.Header as="h3" className="reservation-date text-center">{new Date(reservation?.busService?.collectionTime).toLocaleDateString('en-GB', { day: '2-digit', month: 'long' })} at {new Date(reservation?.busService?.collectionTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</Card.Header>
                <Card.Text className="qr-code text-center mt-3">
                  <QRCode
                    size={200}
                    value={reservation._id}
                    className="QRCode"
                  />
                </Card.Text>
                <Card.Text className="reservation-locations text-center">{reservation?.busService?.pickupLocation?.name} to {reservation?.busService?.dropoffLocation?.name}</Card.Text>
                <Card.Text>Reservation ID: {reservation._id}</Card.Text>
                <Row>
                  <Col><Card.Text>Bus Number: {reservation?.busService?.busNumber}</Card.Text></Col>
                  <Col><Card.Text>Name: {reservation.user.name}</Card.Text></Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                  <Button className="delete-button"onClick={() => handleDeleteConfirmation(reservation._id)}>Cancel Booking</Button>
                </Card.Footer>
            </Card>
          ))}
          <DeleteModal message="Cancel Booking?" show={showDeleteModal} onHide={handleDeleteCancel} onDeleteConfirm={handleDeleteConfirm} />
      </Container>
      </>
    )
  }
}
export default Mytrips