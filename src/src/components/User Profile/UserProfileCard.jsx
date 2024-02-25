// UserProfileCard.jsx

import { Card } from 'react-bootstrap'
import { BsPerson } from 'react-icons/bs'
import '../../styling/UserProfileCard.css'

const UserProfileCard = ({ user }) => {
    return (
        <Card>
            <div className='user-profile-card'> 
                <BsPerson size={50} className='profile-icon' />
                <div className='profile-info'>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>{user.email}</Card.Text>
                </div>
            </div>
        </Card>
    )
}

export default UserProfileCard