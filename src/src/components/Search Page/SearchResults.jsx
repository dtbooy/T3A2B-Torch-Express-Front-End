import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import BookTicket from "./BookTicket";
import { useState } from "react";

const SearchResults = (params) => {
  let { results, locations } = params;

  // holds the service selected for booking
  const [selectedService, setSelectedService] = useState({});
  // controls the booking Modal visibility
  const [showBooking, setShowBooking] = useState(false);

  // load the service details into selectedService state & show booking modal
  const handleClick = (e) => {
    let service = results.find((res) => res._id == e.target.id);
    service = {
      ...service,
      dropoffLocation: locations.find(
        (loc) => loc._id === service.dropoffLocation
      ).name,
      pickupLocation: locations.find(
        (loc) => loc._id === service.pickupLocation
      ).name,
    };
    console.log(service);
    setSelectedService(service);
    // Show the BookTicket Modal
    setShowBooking(true);
  };

  // move this into a utility functions file
  // Calculate arrival time
  function addTime(time, timeOffset) {
    let newTime = new Date(time);
    newTime.setMinutes(newTime.getMinutes() + parseInt(timeOffset));
    return newTime;
  }

  if (results && results.length === 0) {
    return <h4> No Matches found... </h4>;
  } else if (!results) {
    return <></>;
  } else if (results == "loading") {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h4> Loading results... </h4>
      </>
    );
  } else {
    return (
      <>
        <Row>
          {results.map((result) => {
            return (
              <Col key={result._id} sm={12} md={6} xl={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>{result.eventName}</Card.Title>
                    <Card.Text>
                      Date: {new Date(result.collectionTime).toDateString()}
                    </Card.Text>
                    <Card.Text>
                      Departing:{" "}
                      {
                        locations.find(
                          (loc) => loc._id === result.pickupLocation
                        ).name
                      }{" "}
                      at {result.collectionTime.slice(11, 16)}
                    </Card.Text>
                    <Card.Text>
                      Arriving:{" "}
                      {
                        locations.find(
                          (loc) => loc._id === result.dropoffLocation
                        ).name
                      }{" "}
                      at{" "}
                      {addTime(
                        result.collectionTime,
                        result.estimatedTravelTime
                      )
                        .toISOString()
                        .slice(11, 16)}
                      (est)
                    </Card.Text>
                    <Card.Text>
                      Tickets remaining: {result.capacity - result.reservations}
                    </Card.Text>
                    <Button
                      id={result._id}
                      onClick={(e) => handleClick(e)}
                      variant="primary"
                    >
                      Book a seat
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
          <BookTicket
            showBooking={showBooking}
            setShowBooking={setShowBooking}
            selectedService={selectedService}
          />
        </Row>
      </>
    );
  }
};

export default SearchResults;
