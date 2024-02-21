import AdminPage from "./AdminPage"
import LocationModal from "./LocationModal"
import LocationRow from "./LocationRow"


const Locations = () => {

    const endpoint = 'locations'
    const heading = 'Locations'
    const newForm = '/admin/locations/new'
    const tableHeaders = ['Name', 'Address', 'Directions']
    const prepareServiceData = (editedField) => {
        const { _id, name, address, directions } = editedField
        return {
            _id,
            name,
            address,
            directions
        }
    }

    return (
        <AdminPage 
        endpoint={endpoint} 
        heading={heading} 
        newForm={newForm} 
        tableHeaders={tableHeaders} 
        modalComponent={LocationModal}
        renderRow={(field) => (
            <LocationRow
                key={field._id}
                location={field}
            />
        )} 
        prepareData={prepareServiceData} />
    )

}

export default Locations