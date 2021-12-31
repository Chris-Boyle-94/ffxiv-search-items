import { useEffect, useState } from "react";

import { connect } from "react-redux";
import { updateList } from "../../actions";
import ItemCard from "./ItemCard";
import ItemDetails from "./ItemDetails";

const ItemsContainer = ({ searchedItem, items, clicked, updateList }) => {
    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
        updateList(searchedItem);
        //eslint-disable-next-line
    }, [searchedItem]);

    const targetItem = items.find((item) => {
        return item.ID === selectedId;
    });

    return (
        <div className="items">
            {!clicked || targetItem === undefined ? (
                items.map((item) => {
                    return (
                        <ItemCard
                            data={item}
                            key={item.ID}
                            setSelectedId={setSelectedId}
                        />
                    );
                })
            ) : (
                <ItemDetails targetItem={targetItem} />
            )}
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
