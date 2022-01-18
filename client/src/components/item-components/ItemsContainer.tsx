import { useEffect, useState } from "react";

import { connect } from "react-redux";
import { updateList } from "../../actions";
import ItemCard from "./ItemCard";
import ItemDetails from "./ItemDetails";

interface ContainerProps {
    searchedItem: string,
    items: object[],
    clicked: boolean,
    updateList: (search: string) => void
}

const ItemsContainer = ({ searchedItem, items, clicked, updateList } : ContainerProps) => {
    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
        updateList(searchedItem);
        //eslint-disable-next-line
    }, [searchedItem]);

    let targetItem: object;

    interface itemInterface {
        [key: string]: any
    }

    targetItem = items.find((item: itemInterface) => {
        return item.ID === selectedId;
    });

    return (
        <div className="items">
            {!clicked || targetItem === undefined ? (
                items.map((item: itemInterface) => {
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

const mapStateToProps = (state: ContainerProps) => {
    return {
        searchedItem: state.searchedItem,
        items: state.items,
        clicked: state.clicked,
    };
};

export default connect(mapStateToProps, { updateList })(ItemsContainer);
