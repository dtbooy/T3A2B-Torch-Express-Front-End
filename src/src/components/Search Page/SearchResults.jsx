import { Button, Card, Col, Row, Spinner } from "react-bootstrap" 
import { Link } from "react-router-dom" 

const SearchResults = (params) => {
  let { results, locations } = params 

  // move this into a utility functions file
  // Calculate arrival time
  function addTime(time, timeOffset) {
    let newTime = new Date(time) 
    newTime.setMinutes(newTime.getMinutes() + parseInt(timeOffset)) 
    return newTime 
  }

  if (results && results.length === 0) {
    return <h4> No Matches found... </h4> 
  } else if (!results) {
    return <></> 
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
      <Row>
        {results.map((result) => {
          return (
            <Col key={result._id} sm={12} md={6} xl={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{result.eventName}</Card.Title>
                  <Card.Text>Date: {(new Date(result.collectionTime)).toDateString()}</Card.Text>
                  <Card.Text>
                    Departing:{" "}
                    {
                      locations.find((loc) => loc._id === result.pickupLocation)
                        .name
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
                    {addTime(result.collectionTime, result.estimatedTravelTime)
                      .toISOString()
                      .slice(11, 16)}
                    (est)
                  </Card.Text>
                  <Card.Text>Tickets remaining: {result.capacity - result.reservations}</Card.Text>
                  <Link to={`/Book:${result._id}`}>
                  <Button variant="primary">Book a seat</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ) 
        })}
      </Row>
    ) 
  }
} 

export default SearchResults 
