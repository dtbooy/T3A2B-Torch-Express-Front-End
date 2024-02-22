import { useState } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";

function BookTicket(params) {
  const { show, setShowBooking, selectedService } = params;
  
  const [reservations, setReservations] = useState(0)



  const handleClose = () => setShowBooking(false);
  


  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Tickets for {selectedService?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="bookingPickupLocation"
            >
              <Form.Label column sm="4">
                Pickup: 
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={selectedService?.pickupLocation}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="bookingDropoffLocation"
            >
              <Form.Label column sm="4">
                Dropoff: 
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={selectedService?.dropoffLocation}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="bookingDepartureTime"
            >
              <Form.Label column sm="4">
                Departure Time: 
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={selectedService?.collectionTime?.slice(11, 16) + ", " + (new Date(selectedService?.collectionTime).toDateString())}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Col} controlId="numberOfTickets">
                <Form.Label>Number of Tickets</Form.Label>
                <Form.Select
                  value={reservations}
                  onChange={(e)=>setReservations(e.target.value)}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  
                </Form.Select>
              </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Book Tickets
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default BookTicket;
