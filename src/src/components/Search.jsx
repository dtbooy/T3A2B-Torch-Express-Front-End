import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import SearchResults from "./SearchResults";
// import SearchForm from "./SearchForm";

const Search = () => {
  const [pickup, setPickup] = useState();
  const [dropoff, setDropoff] = useState();
  const [date, setDate] = useState("2032-07-26");
  const [results, setResults] = useState();

//   need to do a fetch request for this
    const locations = [
      {
        _id: "65d2e730ff45cf961cc97865",
        name: "South Bank",
        address: "40 Melbourne St, Southbank QLD 4101",
        directions:
          "Cultural Center Bus Station on the corner of Melbourne St and Grey St",
        reservations: [],
        __v: 0,
      },
      {
        _id: "65d2e730ff45cf961cc97866",
        name: "Toowong",
        address: "3 Sherwood Rd, Toowong QLD 4066",
        directions: "Stop 23 on Sherwood Rd, near High St at Toowong Village",
        reservations: [],
        __v: 0,
      },
      {
        _id: "65d2e730ff45cf961cc97867",
        name: "The Gabba",
        address: "Vulture St, Woolloongabba QLD 4102",
        directions: "Stop 23 on Sherwood Rd, near High St at Toowong Village",
        reservations: [],
        __v: 0,
      },
      {
        _id: "65d2e730ff45cf961cc97868",
        name: "Suncorp Stadium",
        address: "40 Castlemaine St, Milton QLD 4064",
        directions: "Drop off point at 40 Castlemaine St",
        reservations: [],
        __v: 0,
      },
      {
        _id: "65d2e730ff45cf961cc97869",
        name: "Queensland Tennis Center",
        address: "40 Castlemaine St, Milton QLD 4064",
        directions: "Drop off point at 40 Castlemaine St",
        reservations: [],
        __v: 0,
      },
    ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // e.stopPropagation();
    setResults("loading");
    const searchQuery = `?${pickup ? "pickup=" + pickup : ""}&${
      dropoff ? "dropoff=" + dropoff : ""
    }&${date ? "date=" + date : ""}`;
    console.log(searchQuery);
    fetch("http://localhost:4001/services/search" + searchQuery)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        console.log(data);
      });
  };

  return (
    <>
      <Container>
        <h2>Search</h2>
        <Form>
          <Row className="mb-3">
            <Col sm>
              <Form.Group as={Col} controlId="pickup">
                <Form.Label>Pickup Location</Form.Label>
                <Form.Select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                >
                  <option value="">Any</option>
                  {locations.map((loc) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm>
              <Form.Group as={Col} controlId="dropoff">
                <Form.Label>Dropoff Location</Form.Label>
                <Form.Select
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                >
                  <option value="">Any</option>
                  {locations.map((loc) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm>
              <Form.Group as={Col} controlId="date">
                <Form.Label>Travel Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Row>
        </Form>
      </Container>
      <Container>
        <SearchResults results={results} />
      </Container>
    </>
  );
};

export default Search;
