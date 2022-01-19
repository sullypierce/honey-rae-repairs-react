import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Link } from "react-router-dom"
import "./Ticket.css"

export const TicketList = () => {
    const [tickets, updateTickets] = useState([])
    const history = useHistory()

    
    const fetchTickets = () => {
        fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
            .then(res => res.json())
            .then(
                (data) => {
                    updateTickets(data)
                }
            )
    }

    useEffect(
        fetchTickets,
        []
    )

    const deleteTicket = (id) => {
        fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        }).then(fetchTickets)
    }

    return (
        <>
        <h2>Service Tickets</h2>
        <button onClick={
            (evt) => {
                evt.preventDefault()
                history.push('createticket')
            }
        }>New Ticket</button>
        {
             tickets.map(
                (ticket) => {
                return <div className={ticket.emergency ? 'emergency' : `ticket`} key={`ticket--${ticket.id}`}>
    {ticket.emergency ? "🚑" : ""} <Link to={`/tickets/${ticket.id}`}>{ticket.description}</Link> submitted by {ticket.customer.name} and worked on by {ticket.employee.name}
    <button onClick={() => {
    deleteTicket(ticket.id)
    }}>Delete</button>
</div>
                }
            )
        }
    </>
    )
}