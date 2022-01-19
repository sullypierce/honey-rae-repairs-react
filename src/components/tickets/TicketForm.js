import React, { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const TicketForm = () => {
    const [ticket, updateTicket] = useState({
        description: '',
        emergency: false
    });
    const history = useHistory()

    const submitTicket = (event) => {
        event.preventDefault()
        const newTicket = {
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: '',
            customerId: parseInt(localStorage.getItem("honey_customer")),
            employeeId: 1
        }

        const fetchObject = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newTicket)
        }

        fetch('http://localhost:8088/serviceTickets', fetchObject)
        .then(() => history.push('tickets'))
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        onChange={(evt) => {
                            const ticketCopy = {...ticket};
                            ticketCopy.description = evt.target.value
                            updateTicket(ticketCopy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        onChange={(evt) => {
                            const ticketCopy = {...ticket};
                            ticketCopy.emergency = evt.target.checked
                            updateTicket(ticketCopy)
                        }} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={submitTicket}>
                Submit Ticket
            </button>
        </form>
    )
}