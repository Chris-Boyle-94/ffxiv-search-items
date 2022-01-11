import { connect } from "react-redux";
import { click } from "../../actions";
import { v4 as uuidv4 } from "uuid";

const ItemCard = ({ data, setSelectedId, click }) => {
    const { Icon, Name, ID } = data;

    const handleClick = () => {
        setSelectedId(ID);
        click();
    };

    return (
        <div className="items__card" onClick={handleClick}>
            <img
                nonce={uuidv4()}
                className="items__icon"
                src={`https://xivapi.com${Icon}`}
                alt="Icon"
            />
            <p className="items__label">{Name}</p>
        </div>
    );
};

export default connect(null, { click })(ItemCard);
