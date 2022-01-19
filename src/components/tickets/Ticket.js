import React, { useEffect, useImperativeHandle, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const Ticket = () => {
    const [ticket, set] = useState({})  // State variable for current ticket object
    const [employees, setEmployees] = useState([])
    const { ticketId } = useParams()  // Variable storing the route parameter
    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets/${ticketId}?_expand=customer&_expand=employee`)
                .then(res => res.json())
                .then(set)
        },
        [ ticketId ]  // Above function runs when the value of ticketId change
    )

    useEffect(
        () => {
            fetch("http://localhost:8088/employees")
            .then(res => res.json())
            .then(data => setEmployees(data))
        }, []
    )

    // Function to invoke when an employee is chosen from <select> element
    const assignEmployee = (evt) => {

        // Construct a new object to replace the existing one in the API
        const updatedTicket = {
            customerId: ticket.customerId,
            employeeId: parseInt(evt.target.value),
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ticket.dateCompleted
        }

        // Perform the PUT HTTP request to replace the resource
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTicket)
        })
            .then(() => {
                history.push("/tickets")
            })
    }
    

    return (
        <>
            <section className="ticket">
                <h3 className="ticket__description">{ticket.description}</h3>
                <div className="ticket__customer">Submitted by {ticket.customer?.name}</div>
                <div className="ticket__employee">Assigned to <select value={ticket.employeeId} id='employee' onChange={assignEmployee}>
                    {
                        employees.map(
                            (employee) => {
                                return <option value={employee.id} key={`employee--${employee.id}`}>{employee.name}</option>
                            }
                        )
                    }
                </select></div>
            </section>
        </>
    )
}