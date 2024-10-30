
import React from "react";
import { withRouter } from "react-router-dom";

class EmployeeCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmployee: {
                id: "",
                FirstName: "",
                LastName: "",
                Age: "",
                DateOfJoining: "",
                Title: "",
                Department: "",
                EmployeeType: "Full Time",
                CurrentStatus:true,
            },
            errors: {}, 
            editMode: "create",
        };
    }

    componentDidMount() {
        const { match } = this.props;
        if (match.params.id) {
            this.fetchEmployee(match.params.id);
        }
        if(match.path.includes("view")) {
            this.setState({ editMode: "view" });
        } else if(match.path.includes("edit")) {
            this.setState({ editMode: "update" });
        }
    }

    fetchEmployee = async (id) => {
        try {
            const response = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                query getEmployee($id: ID!) {
                    getEmployee(id: $id) {
                        id
                        FirstName
                        LastName
                        Age
                        DateOfJoining
                        Title
                        Department
                        EmployeeType
                        CurrentStatus
                    }
                }
            `,
                    variables: { id },
                }),
            });
            if (!response.ok) {
                throw new Error("Error fetching employee");
                return;
            }
            const { data } = await response.json();
            this.setState({ newEmployee: data.getEmployee });
        } catch (error) {
            console.error("Error fetching employee:", error);
        }
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;

        if (name === "Age") {
            parsedValue = parseInt(value, 10) || ""; 
        }

        this.setState((prevState) => ({
            newEmployee: {
                ...prevState.newEmployee,
                [name]: parsedValue,
            },
        }));
    };

    handleCreateOrUpdate = async () => {
        if(this.state.editMode=="update") {
            this.handleUpdate();
        } else if(this.state.editMode=="create") {
            this.handleCreate();
        }
    };

    handleUpdate = async () => {
        const { newEmployee } = this.state;
        const errors = this.validate(newEmployee);
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: `mutation updateEmployee($employee:EmployeeInput!){
                            updateEmployee(employee:$employee){
                                id
                                FirstName
                                LastName
                                Age
                                DateOfJoining
                                Title
                                Department
                                EmployeeType
                                CurrentStatus
                            }
                        }`,
                        variables: { employee: newEmployee }
                    })
                });
                if (!response.ok) {
                    throw new Error("Error updating employee");
                    return;
                }
                alert("Employee updated successfully");
            } catch (error) {
                console.error("Error updating employee:", error);
            }
        }
    }


    handleCreate = async () => {
        const {id, ...newEmployeeWithoutId} = this.state.newEmployee; 
       
        const errors = this.validate(newEmployeeWithoutId);
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    query: `mutation createEmployee($employeeInput: EmployeeInput!) {
                        createEmployee(employeeInput: $employeeInput) {
                            id
                            FirstName
                            LastName
                            Age
                            DateOfJoining
                            Title
                            Department  
                            EmployeeType
                            CurrentStatus
                        }
                    }
                `,
                        variables: { employeeInput: newEmployeeWithoutId },
                    }),
                });
                if (!response.ok) {
                    throw new Error("Error adding employee");
                    return;
                }
                alert("Employee added successfully");
            } catch (error) {
                console.error("Error adding employee:", error);
            }

            this.setState({
                newEmployee: {
                    id: "",
                    FirstName: "",
                    LastName: "",
                    Age: "",
                    DateOfJoining: "",
                    Title: "",
                    Department: "",
                    EmployeeType: "Full Time",
                    CurrentStatus: true,
                },
                errors: {},
            });
        } else {
            this.setState({ errors });
        }
    };

    validate = (employee) => {
        const errors = {};

        if (!employee.FirstName.trim()) {
            errors.FirstName = "First Name is required";
        }

        if (!employee.LastName.trim()) {
            errors.LastName = "Last Name is required";
        }

        if (!employee.Age) {
            errors.Age = "Age is required";
        } else if (isNaN(employee.Age) || employee.Age < 18) {
            errors.Age = "Age must be a valid number and greater than 18";
        }

        return errors;
    };

    render() {
        const { newEmployee, errors, editMode } = this.state;

        return (
            <div style={{ margin: "20px" }}>
                <h2>Create New Employee</h2>
                <form>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="FirstName"
                            value={newEmployee.FirstName}
                            onChange={this.handleInputChange}
                            disabled={editMode==="update" || editMode==="view"}
                        />
                        {errors.FirstName && (
                            <span style={{ color: "red" }}>
                                {errors.FirstName}
                            </span>
                        )}
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="LastName"
                            value={newEmployee.LastName}
                            onChange={this.handleInputChange}
                            disabled={editMode==="update" || editMode==="view"}
                        />
                        {errors.LastName && (
                            <span style={{ color: "red" }}>
                                {errors.LastName}
                            </span>
                        )}
                    </label>
                    <label>
                        Age:
                        <input
                            type="text"
                            name="Age"
                            value={newEmployee.Age}
                            onChange={this.handleInputChange}
                            disabled={editMode==="update" || editMode==="view"}
                        />
                        {errors.Age && (
                            <span style={{ color: "red" }}>{errors.Age}</span>
                        )}
                    </label>
                    <label>
                        Date of Joining:
                        <input
                            type="date"
                            name="DateOfJoining"
                            value={newEmployee.DateOfJoining}
                            onChange={this.handleInputChange}
                            disabled={editMode==="update" || editMode==="view"}
                        />
                    </label>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="Title"
                            value={newEmployee.Title}
                            onChange={this.handleInputChange}
                            disabled={editMode=="view"}
                        />
                    </label>
                    <label>
                        Department:
                        <select
                            name="Department"
                            value={newEmployee.Department}
                            onChange={this.handleInputChange}
                            disabled={editMode=="view"}
                        >
                            <option value="">Select Department</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="IT">IT</option>
                        </select>
                    </label>
                    <label>
                        Employee Type:
                        <select
                            name="EmployeeType"
                            value={newEmployee.EmployeeType}
                            onChange={this.handleInputChange}
                            disabled={editMode==="update" || editMode==="view"}
                        >
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </label>
                    {editMode!=="view" && (<button type="button" onClick={this.handleCreateOrUpdate}>
                        {editMode == "update" ? "Update" : "Create"}
                    </button>)}
                </form>
            </div>
        );
    }
}

export default withRouter(EmployeeCreate);