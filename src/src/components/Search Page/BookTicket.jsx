// TO DO: 
// Link user to Auth profile
// Add confirmation / error Modal to confirm tickets reserved

import { useState } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";

function BookTicket(params) {
  const { showBooking, setShowBooking, selectedService } = params;
  // Stores number of tickets booked
  const [reservations, setReservations] = useState(0);
  // UserId needs to be gotten from Auth-------------------------------------------DEBUG
  const user = "65d6c4b918b39fedca4ddd33";

  // on cancel / close of Booking modal - reset ticket selection
  const handleClose = () => {
    setReservations(1);
    setShowBooking(false);
  };

  // On booking selection,
  const handleBooking = async () => {
    // Need to add AUTHENTICATION to this event
    const tickets = {
      user: user,
      busService: selectedService._id,
      numberOfTickets: reservations,
    };
    try {
      const response = await fetch(`http://localhost:4001/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tickets),
      });
    } catch (error) {
      console.error("Error booking tickets:", error);
    }

    //Close Modal
    handleClose();
  };

  return (
    <>
      <Modal show={showBooking} onHide={handleClose}>
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
                  defaultValue={
                    selectedService?.collectionTime?.slice(11, 16) +
                    ", " +
                    new Date(selectedService?.collectionTime).toDateString()
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Col} controlId="numberOfTickets">
              <Form.Label>Number of Tickets</Form.Label>
              <Form.Select
                value={reservations}
                onChange={(e) => setReservations(e.target.value)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBooking}>
            Book Tickets
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookTicket;
