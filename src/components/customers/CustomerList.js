import React, { useEffect, useState } from "react"

export const CustomerList = () => {
    const [customers, assignCustomers] = useState([])
    const [totalCustomerMessage, updateMessage] = useState('')

    useEffect(
        () => {
            fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then(
                    (customers) => {
                        assignCustomers(customers)
                     }
                )
        },
        []
    )

    useEffect(
        () => {
            if (customers.length === 1) {
                updateMessage('You have 1 customer')
            }
            else {
                updateMessage(`You have ${customers.length} customers`)
            }
        },
        [customers]
    )

    return (
        <>
        <h2>Customers</h2>
        <div>{totalCustomerMessage}</div>
        {
            customers.slice(0,5).map(
                (customer) => {
                return <h3 key={`customer--${customer.id}`}>{customer.name}</h3>
                }
            )
        }
    </>)
}