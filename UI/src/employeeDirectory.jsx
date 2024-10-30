import React from "react";
import EmployeeCreate from "./employeeCreate.jsx";
import EmployeeSearch from "./employeeSearch.jsx";
import EmployeeTable from "./employeeTable.jsx";

export default class EmployeeDirectory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Employee Directory</h1>
                <EmployeeSearch />
                <EmployeeTable />
            </div>
        );
    }
}