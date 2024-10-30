const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    FirstName: String!
    LastName: String!
    Age: Int!
    DateOfJoining: String
    Title: String!
    Department: String!
    EmployeeType: String!
    CurrentStatus: Boolean
  }

  type Query {
    getEmployees: [Employee]
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    createEmployee(employeeInput: EmployeeInput): Employee
    deleteEmployee(id: ID!): Employee
    updateEmployee(employee: EmployeeInput): Employee
  }

  input EmployeeInput {
    id: ID
    FirstName: String!
    LastName: String!
    Age: Int!
    DateOfJoining: String!
    Title: String!
    Department: String!
    EmployeeType: String!
    CurrentStatus: Boolean
  }
`;

module.exports = typeDefs;