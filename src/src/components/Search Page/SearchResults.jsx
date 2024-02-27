import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import BookTicket from "./BookTicket";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaArrowRight } from "react-icons/fa6"

const SearchResults = (params) => {
  let { results, locations } = params;
  // holds the service selected for booking
  const [selectedService, setSelectedService] = useState({});
  // controls the booking Modal visibility
  const [showBooking, setShowBooking] = useState(false);
  // Navigate hook  
  const nav = useNavigate()

  // load the service details into selectedService state & show booking modal
  const handleClick = (e) => {
    // check if logged in 
    if (Cookies.get('userData')) {
      // store selected service details
      let service = results.find((res) => res._id == e.target.id);
      // replace location id's with location names
      service = {
        ...service,
        dropoffLocation: locations.find(
          (loc) => loc._id === service.dropoffLocation
        ).name,
        pickupLocation: locations.find(
          (loc) => loc._id === service.pickupLocation
        ).name,
      };
      // save service to SelectedService state
      setSelectedService(service);
      // Show the BookTicket Modal
      setShowBooking(true);
    } else {
      //redirect to login page
      nav("/login")
    }



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
      <Container className="d-flex justify-content-center">
        <Spinner animation="border loading-bar" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      </Container>
    );
  } else {
    return (
      <Container className="d-flex flex-wrap justify-content-center search-results">
          {results.map((result) => {
            return (
              <Card className="search-result m-2"> 
                <Card.Body>
                  <Row>
                      <Card.Title className="bus-date mb-3">{new Date(result.collectionTime).toDateString()}</Card.Title>
                      <div className="d-flex justify-content-center">
                          <Card.Text className="text-center">
                            {
                              locations.find(
                                (loc) => loc._id === result.pickupLocation
                              ).name
                            }{" "}
                            {result.collectionTime.slice(11, 16)} (EST)
                          </Card.Text>
                          <FaArrowRight className="bus-arrow"/>
                          <Card.Text className="text-center">
                            {
                              locations.find(
                                (loc) => loc._id === result.dropoffLocation
                              ).name
                            }{" "}
                            {addTime(
                              result.collectionTime,
                              result.estimatedTravelTime
                            )
                              .toISOString()
                              .slice(11, 16)}
                            (EST)
                          </Card.Text>
                      </div>
                      <Card.Footer className="bus-tickets mt-3">
                        Tickets remaining: {result.capacity - result.reservations}
                      </Card.Footer>
                      <div className="d-flex justify-content-center align-items-center mt-3">
                        <Button
                          id={result._id}
                          onClick={(e) => handleClick(e)}
                          className="booking-button"
                        >
                          Book a seat
                        </Button>
                      </div>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        <BookTicket
          showBooking={showBooking}
          setShowBooking={setShowBooking}
          selectedService={selectedService}
        />
      </Container>
    );
  }
};

export default SearchResults;
