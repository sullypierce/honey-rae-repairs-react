import React, { useEffect, useState } from "react"

export const EmployeeList = () => {
    const [employees, assignEmployees] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/employees")
                .then(res => res.json())
                .then(
                    (employees) => {
                        assignEmployees(employees)
                     }
                )
        },
        []
    )

    return (
        <>
        <h2>Employees</h2>
        {
            employees.map(
                (employee) => {
                return <h3 key={`employee--${employee.id}`}>{employee.name}</h3>
                }
            )
        }
    </>
    )
}