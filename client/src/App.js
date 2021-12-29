import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Credentials from "./components/credentials-components/Credentials";
import HomePage from "./components/HomePage";
import FavoritesPage from "./components/FavoritesPage";

function App() {
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
    };

    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {token ? (
                        <li>
                            <Link to="/favorites">Favorite Items</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/cred">Login/Sign up</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/" onClick={logout}>
                            Logout
                        </Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/favorites" component={FavoritesPage} />
                    <Route path="/cred" component={Credentials} />
                    <Route exact path="/" component={HomePage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
