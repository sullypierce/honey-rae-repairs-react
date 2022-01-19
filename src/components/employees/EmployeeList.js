import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Link } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, assignEmployees] = useState([])
    const [specialties, setSpecialties] = useState([])
    const history = useHistory() 

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

    useEffect(() => {
        setSpecialties(employees.map(employee => employee.specialty))
    }, [employees])

    return (
        <>
        <h2>Employees</h2>
        <button onClick={
            (evt) => {
                evt.preventDefault()
                history.push('hireemployee')
            }
        }>New Employee</button>
        <div>Specialties: {specialties.map(specialty => ` ${specialty}`).join()}</div>
        {
            employees.map(
                (employee) => {
                return <h3 key={`employee--${employee.id}`}><Link to={`/employees/${employee.id}`}>{employee.name}</Link></h3>
                }
            )
        }
    </>
    )
}