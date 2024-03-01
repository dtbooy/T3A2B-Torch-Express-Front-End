// TO DO:
// Link user to Auth profile
// Add confirmation / error Modal to confirm tickets reserved

import { useState } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import ConfirmationOffcanvas from "./ConfirmationOffcanvas";
import Cookies from "js-cookie";

function BookTicket({ showBooking, setShowBooking, selectedService, setResults }) {
  // Stores number of tickets booked
  const [reservations, setReservations] = useState(1);
  // Stores Offcanvas variables
  const [offcanvasProps, setOffcanvasProps] = useState({
    show: false,
    returned: false,
    message: "Processing...",
    error: false,
  });

  // get user id & access token from cookies
  const user = Cookies.get("userData") && JSON.parse(Cookies.get("userData"))._id;
  const accessToken = Cookies.get("accessToken");

  // on cancel / close of Booking modal - reset ticket selection
  const handleClose = () => {
    // reset ticket selection
    setReservations(1);
    // close modal
    setShowBooking(false);
  };

  // on close of Confirmation message - reset ticket selection
  const clearSearch = () => {
    // clearsearch results
    setResults()
  };

  // On booking selection,
  const handleBooking = async () => {
    //Close Modal
    handleClose();
    // Show processing Offcanvas
    setOffcanvasProps({
      ...offcanvasProps,
      show: true,
      message: "Processing...",
      returned: false,
      name: "Processing",
      alertType: "info",
    });

    // Need to add AUTHENTICATION to this event
    const tickets = {
      user: user,
      busService: selectedService._id,
      numberOfTickets: reservations,
    };

    // Send req to API
    try {
      let res = await fetch(`https://t3a2b-torch-express-api.onrender.com/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(tickets),
      });
      let response = await res.json()
      console.log(response)
      if (response.error) {
        throw new Error(response.error);
      }
      // set success offcanvasProps
      setOffcanvasProps({
        ...offcanvasProps,
        show: true,
        message: "Success, tickets booked!",
        returned: true,
        alertType: "success",
        name: "Success",
      });
    } catch (error) {
      console.error("Error booking tickets:", error);

      // set Error Message
      setOffcanvasProps({
        ...offcanvasProps,
        show: true,
        message: `Error booking tickets: ${error.message}`,
        name: "Error",
        returned: true,
        alertType: "danger",
      });
    }

  };
  const maxTickets = []
  for (let i = 0; i < Math.min(selectedService.capacity - selectedService.reservations, 10); i++) {
    maxTickets.push(i + 1)
  }

  return (
    <>
      <Modal show={showBooking} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Tickets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3 "
              controlId="bookingPickupLocation"
            >
              <Form.Label className="ticket-label" column sm="4" >
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
              <Form.Label className="ticket-label" column sm="4">
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
              <Form.Label className="ticket-label" column sm="4">
                Departure Time:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  value={
                    new Date(selectedService?.collectionTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) +
                    ", " +
                    new Date(selectedService?.collectionTime).toDateString()
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Col} controlId="numberOfTickets">
              <Form.Label className="ticket-label">Number of Tickets</Form.Label>
              <Form.Select
                value={reservations}
                onChange={(e) => setReservations(e.target.value)}
              >
                {maxTickets.map((i) => (
                  <option key={i} value={i}>{i}</option>))
                }

              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="edit-button" onClick={handleBooking}>
            Book Tickets
          </Button>
        </Modal.Footer>
      </Modal>
      <ConfirmationOffcanvas
        offcanvasProps={offcanvasProps}
        setOffcanvasProps={setOffcanvasProps}
        clearSearch={clearSearch}
      />
    </>
  );
}

export default BookTicket;
