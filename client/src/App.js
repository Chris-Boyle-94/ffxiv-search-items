import "./App.css";
import ItemsContainer from "./components/ItemsContainer";
import SearchForm from "./components/SearchForm";

function App() {
    return (
        <div className="App">
            <SearchForm />
            <ItemsContainer />
        </div>
    );
}

export default App;
