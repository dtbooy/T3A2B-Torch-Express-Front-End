const ServicesRow = ({ service }) => {
    return (
        <>
            <td>{service.busNumber}</td>
            <td>{new Date(service.collectionTime).toLocaleString()}</td>
            <td>{service.estimatedTravelTime}</td>
            <td>{service.pickupLocation?.name}</td>
            <td>{service.dropoffLocation?.name}</td>
            <td>{service.capacity}</td>
        </>
    )
}
export default ServicesRow