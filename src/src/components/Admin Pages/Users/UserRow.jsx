const UserRow = ({ user }) => {
    const role = user.is_admin ? 'Admin' : 'User'
    const reservations = user.reservations.length

    return (
        <>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{role}</td>
            <td>{reservations}</td>
        </>
    )
}

export default UserRow
