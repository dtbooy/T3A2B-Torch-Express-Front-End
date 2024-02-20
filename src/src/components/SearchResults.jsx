import { Card, Col, Row } from 'react-bootstrap'

const SearchResults = (params) => {
    let { results } = params
    // results = [{name: "hello", value: "world"},{name: "hello", value: "world"}]
    if (!results){
        return <></>
    } else if (results == "loading") {
        return (<h4> Loading results... </h4>)
    } else {
        return (
            <Row>
                {results.map((result) => {
                    return (
                        <Col key={result._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{result.eventName}</Card.Title>
                                    <Card.Text>{result.pickupLocation}</Card.Text>
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