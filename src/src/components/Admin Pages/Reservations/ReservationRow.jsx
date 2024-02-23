const ReservationRow = ({ reservation }) => {

  return (
    <>
      <td>{reservation?._id}</td>
      <td>{reservation?.user?.name}</td>
      <td>{reservation?.user?.email}</td>
      <td>{reservation?.busService?.busNumber}</td>
    </>
  );
};

export default ReservationRow;
