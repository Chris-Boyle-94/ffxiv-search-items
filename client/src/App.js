import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AccountPage from "./components/account-components/AccountPage";
import HomePage from "./components/HomePage";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>
                        <li>
                            <Link to="/">Logout</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/account" component={AccountPage} />
                    <Route exact path="/" component={HomePage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
