import React from 'react'
import AdminPage from '../AdminPage'
import ReservationRow from './ReservationRow'

const Reservations = () => {
  const endpoint = 'reservations'
  const heading = 'Reservations'
  const tableHeaders = ['User', 'Service']
  const prepareServiceData = (editedField) => {
      const { _id, user, busService} = editedField
      return {
          _id,
          user,
          busService
      }
  }

  return (
      <AdminPage
          endpoint={endpoint}
          heading={heading}
          newForm={null}
          tableHeaders={tableHeaders}
          modalComponent={null}
          renderRow={(field) => (
              <ReservationRow
                  key={field._id}
                  reservation={field}
              />
          )}
          prepareData={prepareServiceData} 
      />
  )
}

export default Reservations