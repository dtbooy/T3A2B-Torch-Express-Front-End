const ServicesRow = ({ service }) => {
    return (
        <>
            <td>{service.busNumber}</td>
            <td>{new Date(service.collectionTime).toLocaleString('en-AU', {  timeZone: 'Australia/Brisbane' })}</td>
            <td>{service.estimatedTravelTime}</td>
            <td>{service.pickupLocation?.name}</td>
            <td>{service.dropoffLocation?.name}</td>
            <td>{service.capacity}</td>
        </>
    )
}
export default ServicesRow