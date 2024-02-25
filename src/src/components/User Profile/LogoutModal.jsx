import Cookies from 'js-cookie'
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LogoutModal = ({ show, onHide, setIsLoggedIn }) => {
    const nav = useNavigate()

    const handleLogout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('userData')
    setIsLoggedIn(false)

    // Redirect to login page
    nav('/login')
    onHide()
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to logout?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="outline-danger" onClick={handleLogout}>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LogoutModal