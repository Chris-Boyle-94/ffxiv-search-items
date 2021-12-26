import { connect } from "react-redux";
import { click } from "../actions";

const ItemCard = ({ data, setSelectedId, click }) => {
    const { Icon, Name, ID } = data;

    const handleClick = () => {
        setSelectedId(ID);
        click();
    };

    return (
        <div>
            <img
                src={`https://xivapi.com${Icon}`}
                alt="Icon"
                onClick={handleClick}
            />
            <p>{Name}</p>
        </div>
    );
};

export default connect(null, { click })(ItemCard);
