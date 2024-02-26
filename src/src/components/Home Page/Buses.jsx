import React from 'react'
import { Accordion } from 'react-bootstrap'

const Buses = () => {
    return (
        <div>
            <Accordion defaultActiveKey="">
                <Accordion.Item className="accordion-item mb-3" eventKey="0">
                    <Accordion.Header>
                        Wheelchair Accessibility
                    </Accordion.Header>
                    <Accordion.Body>
                        Our buses are equipped with wheelchair ramps or lifts to accommodate passengers who use wheelchairs or mobility devices.
                        Priority seating areas are available onboard for individuals with disabilities.
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                <Accordion>
                    <Accordion.Item className="accordion-item mb-3" eventKey="1">
                        <Accordion.Header>
                            Step-Free Access
                        </Accordion.Header>
                        <Accordion.Body>
                            All buses are designed to provide step-free access for passengers with limited mobility or difficulty navigating stairs.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion>
                    <Accordion.Item className="accordion-item mb-3" eventKey="2">
                        <Accordion.Header>
                            Priority Seating
                        </Accordion.Header>
                        <Accordion.Body>
                            Priority seating areas near the front of the bus are designated for passengers with disabilities, seniors, pregnant women, and individuals with special needs. These seats are clearly marked and should be vacated upon request to accommodate passengers who require them.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion defaultActiveKey="">
                <Accordion.Item className="accordion-item mb-3" eventKey="3">
                    <Accordion.Header>
                        Comfort
                    </Accordion.Header>
                    <Accordion.Body>
                        Our buses feature comfortable seating with ample legroom, ensuring a relaxing travel experience even during hot weather with efficient air conditioning systems.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Buses