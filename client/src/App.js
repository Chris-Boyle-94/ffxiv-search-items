import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Credentials from "./components/credentials-components/Credentials";
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
                    <Route path="/cred" component={Credentials} />
                    <Route exact path="/" component={ItemsContainer} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
