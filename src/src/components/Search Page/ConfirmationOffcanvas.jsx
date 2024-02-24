import { Alert, Button, Offcanvas } from 'react-bootstrap'

const ConfirmationOffcanvas = ({offcanvasProps, setOffcanvasProps}) => {
  const handleOffcanvasClose = () => {
    // close OffCanvas, reset state
    setOffcanvasProps({props : {...offcanvasProps.props}, show : false})
  };
        return (
          <>
          <Button variant="primary" onClick={()=>setOffcanvasProps({...offcanvasProps, show : true})}>   TEST
          </Button>


          <Offcanvas show={offcanvasProps.show} onHide={handleOffcanvasClose} {...offcanvasProps.props}>
              {/* ={offcanvasProps.returned} */}
              <Offcanvas.Header closeButton>  
                <Offcanvas.Title>{offcanvasProps.name}</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {offcanvasProps.message}
              </Offcanvas.Body>
            </Offcanvas>
          </>
        );
      // } else if (error){
      //   return (
      //     <>
      //       <Offcanvas show={show} onHide={handleClose} {...props}>
      //         <Offcanvas.Header closeButton>
      //           <Offcanvas.Title>Error - Operation Failed</Offcanvas.Title>
      //         </Offcanvas.Header>
      //         <Offcanvas.Body>
      //         <Alert variant={"warning"}>
      //       {message}
      //   </Alert>
      //       </Offcanvas.Body>
      //       </Offcanvas>
      //     </>
      //   );
      // } else {
      //   <>
      //   <Offcanvas show={show} onHide={handleClose} {...props}>
      //     <Offcanvas.Header closeButton>
      //       <Offcanvas.Title>Success!</Offcanvas.Title>
      //     </Offcanvas.Header>
      //     <Offcanvas.Body>
      //     <Alert variant={"success"}>
      //       {message}
      //   </Alert>
            
      //     </Offcanvas.Body>
      //   </Offcanvas>
      // </>
      // }
    }
      
      

export default ConfirmationOffcanvas