import ItemsContainer from "./item-components/ItemsContainer";
import SearchForm from "./SearchForm";

const HomePage = () => {
    return (
        <div className="App">
            <SearchForm />
            <ItemsContainer />
        </div>
    );
};

export default HomePage;
