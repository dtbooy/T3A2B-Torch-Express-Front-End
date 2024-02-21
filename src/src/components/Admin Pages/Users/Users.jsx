import UserRow from './UserRow'
import UserModal from './UserModal'
import AdminPage from '../AdminPage'



const Users = () => {
    const endpoint = 'users'
    const heading = 'Users'
    const tableHeaders = ['Name', 'Email', 'Role', 'Reservations']
    const prepareServiceData = (editedField) => {
        const { _id, name, email, is_admin, reservations} = editedField
        return {
            _id,
            name,
            email,
            is_admin,
            reservations,
        }
    }

    return (
        <AdminPage
            endpoint={endpoint}
            heading={heading}
            newForm={null}
            tableHeaders={tableHeaders}
            modalComponent={UserModal}
            renderRow={(field) => (
                <UserRow
                    key={field._id}
                    user={field}
                />
            )}
            prepareData={prepareServiceData} 
        />
    )
}


export default Users