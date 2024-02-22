import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import BookTicket from "./BookTicket";
// import SearchForm from "./SearchForm";  // 

const Search = () => {
  const [locations, setLocations] = useState([]);
  const [results, setResults] = useState();
  
  useEffect(() => {fetch("http://localhost:4001/locations")
        .then((res) => res.json())
        .then((data) => setLocations(data))}
    ,[]
);

  return (
    <>
    <h2>Search</h2>
      <SearchBar locations={locations} setResults={setResults}/>
      <Container>
        <SearchResults results={results} locations={locations} />
      </Container>

    </>
  );
};

export default Search;
