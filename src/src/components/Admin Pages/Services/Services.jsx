import AdminPage from '../AdminPage'
import ServiceModal from './ServiceModal'
import ServicesRow from './ServicesRow'

const Services = () => {
    const endpoint = 'services'
    const heading = 'Services'
    const newForm = '/admin/services/new'
    const tableHeaders = ['Bus Number', 'Collection Time', 'Estimated Travel Time', 'Pick Up Location', 'Drop Off Location', 'Capacity']
    const prepareServiceData = (editedField) => {
        const { _id, busNumber, collectionTime, estimatedTravelTime, capacity, pickupLocation, dropoffLocation } = editedField
        return {
            _id,
            busNumber,
            collectionTime,
            estimatedTravelTime,
            capacity,
            pickupLocation,
            dropoffLocation
        }
    }


    return (
        <AdminPage
            endpoint={endpoint}
            heading={heading}
            newForm={newForm}
            tableHeaders={tableHeaders}
            modalComponent={ServiceModal}
            renderRow={(field) => (
                <ServicesRow
                    key={field._id}
                    service={field}
                />
            )}
            prepareData={prepareServiceData} 
        />
    )
}

export default Services
