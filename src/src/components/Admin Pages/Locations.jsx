import AdminPage from "./AdminPage"
import LocationModal from "./LocationModal"


const Locations = () => {

    const endpoint = 'locations'
    const heading = 'Locations'
    const newForm = '/admin/locations/new'
    const tableHeaders = ['Name', 'Address', 'Action']

    return (
        <AdminPage endpoint={endpoint} heading={heading} newForm={newForm} tableHeaders={tableHeaders} modalComponent={LocationModal}/>
    )

}

export default Locations