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
        <div>
            <form onSubmit={handleSubmit}>
                <label>Item Search: </label>
                <input
                    name="search"
                    type="text"
                    value={formValue}
                    onChange={handleChange}
                    placeholder="Sword, potion, robe, etc..."
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default connect(null, { search })(SearchForm);
