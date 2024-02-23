import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const AdminFilter = ({ tableHeaders, filter, setFilter, filterProps }) => {
  // Set form control State
  const [searchTerms, setSearchTerms] = useState({});
  
    
    //DELETE
    // const headerProps = tableHeaders.map((header, index)=>{
    // let path = filterProps[index].split(".")
    // if (path.length >1) { 
    //     return {[header] : {[path[0]] : path[1]}};
    //     } else {
    //         return {[header] : filterProps[index]}}})
    // console.log(headerProps);    
    
    
  // On Searchterm change update Filter State
  useEffect(() => {
    setFilter({ ...filter, ...searchTerms });
    // console.log(filter)
  }, [searchTerms]);

  if (filter) {
    return (
      <Form>
        <Row>
          {tableHeaders.map((head, index) => {
            return (
              <Col key={head}>
                <Form.Group>
                  <Form.Label>{head}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={head}
                    value={filter[head]}
                    onChange={(e) =>{
                        let path = filterProps[index].split(".")
                    //   if (path.length >1) {
                    //     setSearchTerms({
                    //         ...searchTerms,
                    //         [path[0]] : {[path[1]] : e.target.value}})
                    //   }else {
                      // need to change [head] to the field value so the filter works!!!! -----------------------------DEBUG
                      setSearchTerms({
                        ...searchTerms,
                        [path[0]]: e.target.value,
                      })}
                    }
                  />
                </Form.Group>
              </Col>
            );
          })}
        </Row>
      </Form>
    );
  } else {
    return <>Loading...</>;
  }
};

export default AdminFilter;
