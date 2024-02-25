import { BsPersonFill } from 'react-icons/bs'
import '../../styling/ProfileIcon.css';;

const ProfileIcon = ({ user }) => {
    const firstName = user.name.split(' ')[0]

    return (
        <div className='icon-container'>
            <BsPersonFill /> 
            <div>
                {firstName}
            </div>
           
        </div>
    )
    }

export default ProfileIcon