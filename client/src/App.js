import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ItemsContainer from "./components/item-components/ItemsContainer";
import SearchForm from "./components/SearchForm";
import AccountPage from "./components/account-components/AccountPage";

function App() {
    return (
        <Router>
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
                <Route path="/account">
                    <AccountPage />
                </Route>
                <Route path="/">
                    <div className="App">
                        <SearchForm />
                        <ItemsContainer />
                    </div>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
