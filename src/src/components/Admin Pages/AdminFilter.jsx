import { useEffect, useState } from "react"
import { Col, Form, Row } from "react-bootstrap"

const AdminFilter = ({ tableHeaders, filter, setFilter, filterProps }) => {
  // Set form control State
  const [searchTerms, setSearchTerms] = useState({})

  // On Searchterm change update Filter State
  useEffect(() => {
    setFilter({ ...filter, ...searchTerms })
  }, [searchTerms])

  const handleInputChange = (e, index) => {
    let value = e.target.value

    // Convert value to boolean for 'Role' column
    if (tableHeaders[index] === "Role") {
      // true if 'admin' is selected - otherwise false
      value = e.target.value === "admin"
    }

    setSearchTerms({
      ...searchTerms,
      [filterProps[index]]: value,
    })
  }

  return (
    <Form>
      <Row>
        {tableHeaders.map((header, index) => (
          <Col key={index}>
            <Form.Group>
              {header === "Role" ? (
                // Render a dropdown for Role column 
                <Form.Select
                  value={filter[header]}
                  onChange={(e) => handleInputChange(e, index)}
                  className="table-filter"
                >
                  <option value="">All</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Form.Select>
              ) : header === "Reservations" || header === "Estimated Travel Time" || header === "Capacity" ? (
                // Render an empty td for these headings
                <td key={index}></td>
              ) : header === "Collection Time" ? (
                // Render date  picker for 'Collection Time'
                <Form.Control
                  type="date"
                  placeholder="Search"
                  value={searchTerms[filterProps[index]] || ''}
                  onChange={(e) => handleInputChange(e, index)}
                  className="date-filter"
                />
              ) : (
                <Form.Control
                type="text"
                placeholder='Search'
                value={filter[header]}
                onChange={(e) =>{
                    let path = filterProps[index].split(".")
                  setSearchTerms({
                    ...searchTerms,
                    [path[0]]: e.target.value,
                  })}
                }
                className="table-filter"
              />
              )}
            </Form.Group>
          </Col>
        ))}
        {/* Empty cell for the action buttons */}
        <Col></Col>
      </Row>
    </Form>
  )
}

export default AdminFilter