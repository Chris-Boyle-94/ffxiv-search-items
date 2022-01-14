import { useEffect, useState, Component } from "react";

import { connect } from "react-redux";
import { updateList } from "../../actions";
import ItemCard from "./ItemCard";
import ItemDetails from "./ItemDetails";
import PropTypes from "prop-types";

const ItemsContainer = ({ searchedItem, items, clicked, updateList }) => {
    const [selectedId, setSelectedId] = useState("");

    Component.propTypes = {
        children: PropTypes.node,
    };

    useEffect(() => {
        updateList(searchedItem);
        //eslint-disable-next-line
    }, [searchedItem]);

    let targetItem;

    if (Array.isArray(items)) {
        targetItem = items.find((item) => {
            return item.ID === selectedId;
        });
    }

    return (
        <div className="items">
            {!clicked || targetItem === undefined ? (
                Array.isArray(items) &&
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
