import React from 'react'
import AdminPage from '../AdminPage'
import ReservationRow from './ReservationRow'

const Reservations = () => {
  const endpoint = 'reservations'
  const heading = 'Reservations'
  const tableHeaders = ['Reservation ID', 'User Name', 'User Email', 'Bus Number']

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
      />
  )
}

export default Reservations