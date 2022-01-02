import { useState } from "react";

import { connect } from "react-redux";
import { search } from "../actions";

const initialValue = "";

const SearchForm = ({ search }) => {
    const [formValue, setFormValue] = useState(initialValue);

    const handleChange = (e) => {
        e.preventDefault();
        setFormValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        search(formValue);
        setFormValue(initialValue);
    };

    return (
        <div className="searchForm">
            <form className="searchForm__form" onSubmit={handleSubmit}>
                <input
                    className="searchForm__input"
                    name="search"
                    type="text"
                    value={formValue}
                    onChange={handleChange}
                    placeholder="Search for items like robe, sword, potion, etc..."
                />
                <button className="searchForm__button" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default connect(null, { search })(SearchForm);
