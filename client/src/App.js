import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Credentials from "./components/credentials-components/Credentials";
import HomePage from "./components/HomePage";
import FavoritesPage from "./components/FavoritesPage";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
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
