import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import EmployeeDirectory from "./employeeDirectory.jsx";
import EmployeeCreate from "./employeeCreate.jsx";

function App() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    React.useEffect(() => {
        // Add or remove class based on current route
        if (isHomePage) {
            document.body.classList.add("home-background");
        } else {
            document.body.classList.remove("home-background");
        }
    }, [isHomePage]);

    return (
        <>
            <nav className="navbar">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/list/all">List</Link>
                <Link className="nav-link" to="/add-new">Add New</Link>
            </nav>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/list/:filterType" component={EmployeeDirectory} />
                <Route exact path="/add-new" component={EmployeeCreate} />
                <Route exact path="/edit/:id" component={EmployeeCreate} />
                <Route exact path="/view/:id" component={EmployeeCreate} />
            </Switch>
        </
        >
    );
}

function Home() {
    return (
        <div className="home-container">
            <div className="overlay">
                <div className="home-content">
                    <h2>Welcome to My Application</h2>
                    <p>Your one-stop solution for managing employee records.</p>
                    
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);
