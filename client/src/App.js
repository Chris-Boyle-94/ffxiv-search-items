import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Credentials from "./components/credentials-components/Credentials";
import SignUp from "./components/credentials-components/SignUp";
import FavoritesPage from "./components/FavoritesPage";
import Header from "./components/Header";
import ItemsContainer from "./components/item-components/ItemsContainer";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/favorites" component={FavoritesPage} />
                    <Route
                        path="/login"
                        render={(props) => (
                            <Credentials {...props} account={true} />
                        )}
                    />
                    <Route
                        path="/sign-up"
                        render={(props) => (
                            <Credentials {...props} account={false} />
                        )}
                    />
                    <Route exact path="/" component={ItemsContainer} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
