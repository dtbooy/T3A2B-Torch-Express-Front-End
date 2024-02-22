import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";

const Search = () => {
  // stores the location names
  const [locations, setLocations] = useState([]);
  // stores the search Results
  const [results, setResults] = useState();

  // Get locations from API
  useEffect(() => {
    fetch("http://localhost:4001/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <>
      <h2>Search</h2>
      <SearchBar locations={locations} setResults={setResults} />
      <Container>
        <SearchResults results={results} locations={locations} />
      </Container>
    </>
  );
};

export default Search;
