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
              <div className={`alert alert-${offcanvasProps.alertType}`}>
              <Offcanvas.Header className="py-0" closeButton={offcanvasProps.returned}> 
              <Offcanvas.Title >{offcanvasProps.name}</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="py-0">
               {offcanvasProps.message}
               </Offcanvas.Body>
               </div>
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