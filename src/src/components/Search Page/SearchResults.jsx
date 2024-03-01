import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import BookTicket from "./BookTicket";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaArrowRight } from "react-icons/fa6"

const SearchResults = ({ results, locations, setResults }) => {

  // holds the service selected for booking
  const [selectedService, setSelectedService] = useState({});
  // controls the booking Modal visibility
  const [showBooking, setShowBooking] = useState(false);
  // Navigate hook  
  const nav = useNavigate()
  const user = Cookies.get('userData')

  // load the service details into selectedService state & show booking modal
  const handleClick = (e) => {
    // check if logged in 
    if (user) {
      // store selected service details
      let service = results.find((res) => res._id == e.target.id);
      //Do nothing if sold out
      if (service.capacity <= service.reservations) {
        return
      }
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

  // Calculate arrival time
  function addTime(time, timeOffset) {
    let newTime = new Date(time);
    newTime.setMinutes(newTime.getMinutes() + parseInt(timeOffset));
    return newTime;
  }

  if (results && results.length === 0) {
    return <h4 className="result-error"> No Matches found... </h4>;
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
            <Card key={result._id} className="search-result m-2">
              <Card.Body>
                <Row>
                  <Card.Title className="bus-date mb-3">{new Date(result.collectionTime).toDateString()}</Card.Title>
                  <div className="d-flex justify-content-center">
                    <Card.Text className="text-center">
                      {
                        locations.find(
                          (loc) => loc._id === result.pickupLocation)?.name
                      }{" "}
                      {new Date(result.collectionTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </Card.Text>

                    <FaArrowRight className="bus-arrow" />
                    <Card.Text className="text-center">
                      {
                        locations.find((loc) => loc._id === result.dropoffLocation)?.name
                      }{" "}
                      {
                        new Date(
                          new Date(result.collectionTime).getTime() + result.estimatedTravelTime * 60000 // Convert minutes to milliseconds
                        ).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                      }
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
                      {(result.capacity > result.reservations) ?
                        user ? "Book a seat" : "Login to Book"
                        : "Sold Out"}
                    </Button>
                  </div>
                </Row>
              </Card.Body>
            </Card>
          )
        })}
        <BookTicket
          showBooking={showBooking}
          setShowBooking={setShowBooking}
          selectedService={selectedService}
          setResults={setResults}
        />
      </Container>
    )
  }
}

export default SearchResults;
