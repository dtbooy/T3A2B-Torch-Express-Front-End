import AdminPage from '../AdminPage'
import ReservationRow from './ReservationRow'

const Reservations = () => {
  const endpoint = 'reservations'
  const heading = 'Reservations'
  const tableHeaders = ['Reservation ID', 'User Name', 'User Email', 'Bus Number']
  const propertyPaths = ["_id", "user.name", "user.email", "busService.busNumber"]  // this can probably be refactored into tableHeaders & allow the Row files to become generic

  return (
      <AdminPage
          endpoint={endpoint}
          heading={heading}
          newForm={null}
          tableHeaders={tableHeaders}
          modalComponent={null}
          prepareServiceData={null}
          renderRow={(field) => (
              <ReservationRow
                  key={field._id}
                  reservation={field}
              />
          )}
          hideEditButton={true} 
          propertyPaths={propertyPaths}
      />
  )
}

export default Reservations