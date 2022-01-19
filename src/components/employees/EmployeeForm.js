import React, { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const EmployeeForm = () => {
    const [employee, updateEmployee] = useState({
        name: '',
        specialty: ''
    });
    const history = useHistory()

    const hireEmployee = (event) => {
        event.preventDefault()
        const newEmployee = {
            name: employee.name,
            specialty: employee.specialty
        }


        const fetchObject = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newEmployee)
        }

        fetch('http://localhost:8088/employees', fetchObject)
        .then(() => history.push('employees'))
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee Hire</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="name of new employee"
                        onChange={(evt) => {
                            const employeeCopy = {...employee};
                            employeeCopy.name = evt.target.value
                            updateEmployee(employeeCopy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Specialty:</label>
                    <input type="text"
                    className="form-control"
                        onChange={(evt) => {
                            const employeeCopy = {...employee};
                            employeeCopy.specialty = evt.target.value
                            updateEmployee(employeeCopy)
                        }} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={hireEmployee}>
                Finish Hiring
            </button>
        </form>
    )
}