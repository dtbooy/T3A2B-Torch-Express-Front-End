import React from 'react'

const ReservationRow = ({reservation}) => {
  return (
    <>
        <td>{reservation.user}</td>
        <td>{reservation.busService._id}</td>
    </>
  )
}

export default ReservationRow