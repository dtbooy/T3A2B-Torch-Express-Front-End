import { useState } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";

const SearchBar = (params) => {
  const { locations, setResults } = params;

  // Holds controlled form inputs
  const [inputForm, setInputForm] = useState({ date: "2032-08-22" });

  // Sets form input states
  function handleFormChange(e) {
    setInputForm({ ...inputForm, [e.target.id]: e.target.value });
  }

  // Send search request to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResults("loading");
    const searchQuery = `?${
      inputForm.pickup ? "pickup=" + inputForm.pickup : ""
    }&${inputForm.dropoff ? "dropoff=" + inputForm.dropoff : ""}&${
      inputForm.date ? "date=" + inputForm.date : ""
    }`;
    console.log(searchQuery);
    fetch("http://localhost:4001/services/search" + searchQuery)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        console.log(data);
      });
  };

  return (
    <Container>
      <Form>
        <Row className="mb-3">
          <Col sm>
            <Form.Group as={Col} controlId="pickup">
              <Form.Label>Pickup Location</Form.Label>
              <Form.Select
                value={inputForm.pickup}
                onChange={(e) => handleFormChange(e)}
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
                value={inputForm.dropoff}
                onChange={(e) => handleFormChange(e)}
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
                value={inputForm.date}
                onChange={(e) => handleFormChange(e)}
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
  );
};

export default SearchBar;
