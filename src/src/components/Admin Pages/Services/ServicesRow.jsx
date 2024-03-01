const ServicesRow = ({ service }) => {
    return (
        <>
            <td>{service.busNumber}</td>
            <td>{new Date(service.collectionTime).toDateString()+ " " + new Date(service.collectionTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
            <td>{service.estimatedTravelTime}</td>
            <td>{service.pickupLocation?.name}</td>
            <td>{service.dropoffLocation?.name}</td>
            <td>{service.capacity}</td>
        </>
    )
}
export default ServicesRow