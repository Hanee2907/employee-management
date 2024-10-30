import React from "react";
import { withRouter } from "react-router-dom";

class EmployeeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: {
                employeeType: "",
                // jobTitle: "",
            },
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;

        this.setState(prev => ({ searchParams: { ...prev.searchParams, [name]: parsedValue }}));
    };

    handleSearch = () => {
        const { searchParams } = this.state;
        this.props.history.push(`/list/${searchParams.employeeType}`);
    };

    render() {
        const { searchParams } = this.state;

        return (
            <div>
                <h2>Search Employees</h2>
                <label>
                    Employee Type:
                    <select
                        name="employeeType"
                        value={searchParams.employeeType}
                        onChange={this.handleInputChange}
                    >
                        <option value="all">All</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                    </select>
                </label>
                {}
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default withRouter(EmployeeSearch);