import { useEffect, useState } from "react";

import { connect } from "react-redux";
import { updateList } from "../actions";
import ItemCard from "./ItemCard";

const ItemsContainer = ({ searchedItem, items, clicked, updateList }) => {
    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
        updateList(searchedItem);
    }, [searchedItem]);

    return (
        <div>
            <h1>Items:</h1>
            {items.map((item) => {
                return (
                    <ItemCard
                        data={item}
                        key={item.ID}
                        setSelectedId={setSelectedId}
                    />
                );
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        searchedItem: state.searchedItem,
        items: state.items,
        clicked: state.clicked,
    };
};

export default connect(mapStateToProps, { updateList })(ItemsContainer);
