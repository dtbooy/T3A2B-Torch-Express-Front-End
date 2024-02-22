import { useEffect } from "react"
import { Col, Form, Row } from "react-bootstrap"

const AdminFilter = (params) => {
   const { tableHeaders, filter, setFilter, endpoint } = params
   // On Page load, reset filters
   useEffect(()=>setFilter({...filter, [endpoint]:{}}),[])

  return (
    <Form>
        <Row>
        {tableHeaders.map((head)=>{
            return (
                <Col key={head}>
                <Form.Group >
                    <Form.Label>{head}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={head}
                        value={filter?.[endpoint]?.[head]}
                        onChange={(e) => setFilter({...filter, [endpoint]: {...filter[endpoint], [head]: e.target.value }})}
                    />
                </Form.Group>
                </Col>
            )
        })}
        </Row>
    </Form>
    
  )
}

export default AdminFilter