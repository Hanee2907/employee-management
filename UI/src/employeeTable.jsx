import React from "react";
import { withRouter } from "react-router-dom";

  

class EmployeeTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            filteredEmployees: [],
        };
    }
    
    componentDidMount() {
        this.fetchEmployees();
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.match !== prevProps.match) {
            const filterType = this.props.match.params.filterType;
            if(filterType){
if(filterType=="all"){this.setState({filteredEmployees: this.state.employees})} else {
                const filteredEmployees = this.state.employees.filter(employee => employee.EmployeeType === filterType);
                this.setState({ filteredEmployees: filteredEmployees });}
            }
        }
    }

    fetchEmployees = async () => {
        try {
            const response = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
              query {
                getEmployees {
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
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            this.setState({ employees: result.data.getEmployees, filteredEmployees: result.data.getEmployees});
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    handleDelete = async (id) => {
        try {
            fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                        mutation deleteEmployee($id: ID!){
                            deleteEmployee(id: $id) {
                                id
                            }
                        }
                    `,
                    variables: JSON.stringify({ id }),
                }),
            }).then(() => {
                this.setState({
                    filteredEmployees: this.state.employees.filter(
                        (employee) => employee.id !== id
                    ),
                });
            });
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };



    handleEdit = (id) => {
        this.props.history.push(`/edit/${id}`);
    };

    handleView = (id) => {
        this.props.history.push(`/view/${id}`);
    };

    render() {
        const { filteredEmployees } = this.state;

        return (
            <div>
                <h2>Employee List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Date of Joining</th>
                            <th>Title</th>
                            <th>Department</th>
                            <th>Employee Type</th>
                            <th>Current Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees &&
                            filteredEmployees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.FirstName}</td>
                                    <td>{employee.LastName}</td>
                                    <td>{employee.Age}</td>
                                    <td>{employee.DateOfJoining}</td>
                                    <td>{employee.Title}</td>
                                    <td>{employee.Department}</td>
                                    <td>{employee.EmployeeType}</td>
                                    <td>{employee.CurrentStatus == true ? '1' : '0'}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                this.handleEdit(employee.id)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                this.handleDelete(employee.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() =>
                                                this.handleView(employee.id)
                                            }
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(EmployeeTable);
