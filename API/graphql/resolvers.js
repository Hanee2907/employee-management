const Employee = require("../models/Employee");

const resolvers = {
    Query: {
        getEmployees: async () => {
            try {
                const employees = await Employee.find();
                return employees;
            } catch (err) {
                throw err;
            }
        },
        getEmployee: async (_, { id }) => {
            try {
                const employee = await Employee.findById(id);
                return employee;
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        createEmployee: async (_, { employeeInput }) => {
            const employee = new Employee({
                ...employeeInput,
            });

            try {
                const result = await employee.save();
                return result;
            } catch (err) {
                throw err;
            }
        },
        deleteEmployee: async (_, { id }) => {
            try {
                const employee = await Employee.findByIdAndDelete(id);
                return employee;
            } catch (err) {
                throw err;
            }
        },
        updateEmployee: async (_, { employee }) => {
            try {
                const result = await Employee.findByIdAndUpdate(employee.id, employee);
                return result;
            } catch (err) {
                throw err;
            }
        }
    }
};

module.exports = resolvers;
