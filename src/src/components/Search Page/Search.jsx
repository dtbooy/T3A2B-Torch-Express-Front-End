import { useEffect, useState } from "react" 
import { Container, Row } from "react-bootstrap" 
import Button from "react-bootstrap/Button" 
import Col from "react-bootstrap/Col" 
import Form from "react-bootstrap/Form" 
import SearchResults from "./SearchResults" 
// import SearchForm from "./SearchForm"   // 

const Search = () => {
  const [pickup, setPickup] = useState() 
  const [dropoff, setDropoff] = useState() 
  const [date, setDate] = useState("2032-08-22") 
  const [results, setResults] = useState() 
  const [locations, setLocations] = useState([]) 


  useEffect(() => {fetch("http://localhost:4001/locations")
        .then((res) => res.json())
        .then((data) => setLocations(data))}
    ,[]
) 


  const handleSubmit = async (e) => {
    e.preventDefault() 
    setResults("loading") 
    const searchQuery = `?${pickup ? "pickup=" + pickup : ""}&${
      dropoff ? "dropoff=" + dropoff : ""
    }&${date ? "date=" + date : ""}` 
    console.log(searchQuery) 
    fetch("http://localhost:4001/services/search" + searchQuery)
      .then((res) => res.json())
      .then((data) => {
        setResults(data) 
        console.log(data) 
      }) 
  } 

  return (
    <>
      <h2>Search</h2>
      <SearchBar locations={locations} setResults={setResults} />
      <Container>
        <SearchResults results={results} locations={locations} />
      </Container>
    </>
  ) 
} 

export default Search 
