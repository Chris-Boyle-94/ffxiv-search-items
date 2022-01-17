import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import FavoritesPage from "./components/FavoritesPage";
import Header from "./components/Header";
import Login from "./components/credentials-components/Login";
import SignUp from "./components/credentials-components/SignUp";
import ItemsContainer from "./components/item-components/ItemsContainer";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <PrivateRoute path="/favorites" component={FavoritesPage} />
                    <Route path="/login" component={Login} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route exact path="/" component={ItemsContainer} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
