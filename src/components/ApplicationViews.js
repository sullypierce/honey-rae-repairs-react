import React from "react"
import { Route } from "react-router-dom"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeList } from "./employees/EmployeeList"
import { TicketForm } from "./tickets/TicketForm"
import { TicketList } from "./tickets/TicketList"
import { EmployeeForm } from "./employees/EmployeeForm"
import { Ticket } from "./tickets/Ticket"

export const ApplicationViews = () => {
    return (
        <>
            <h1>Honey Rae Repairs</h1>
            <Route path="/customers">
                <CustomerList />
            </Route>
            <Route path="/employees">
                <EmployeeList />
            </Route>
            <Route exact path="/tickets">
                <TicketList />
            </Route>
            <Route path="/tickets/:ticketId(\d+)">
                <Ticket />
            </Route>
            <Route path="/createticket">
                <TicketForm />
            </Route>
            <Route path="/hireemployee">
                <EmployeeForm />
            </Route>
        </>
    )
}