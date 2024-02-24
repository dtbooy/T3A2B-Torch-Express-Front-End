import { Offcanvas } from 'react-bootstrap'

const ConfirmationOffcanvas = ({offcanvasProps, setOffcanvasProps}) => {
  // To use this component need to set a State in the call component and set:
  // name: Title
  // message: message content
  // alertType: bootstrap alert type (styling) 
  // show: boolean controller to show / hide the alert


  const handleOffcanvasClose = () => {
    // close OffCanvas, reset state
    setOffcanvasProps({show : false})
  };

        return (
          <>
          <Offcanvas show={offcanvasProps.show} onHide={handleOffcanvasClose} scroll={true} backdrop={false} placement='top'>
              <div style={{height : "100%"}} className={`alert alert-${offcanvasProps.alertType} my-0 overflow-scroll`}>
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
    }
      
      

export default ConfirmationOffcanvas