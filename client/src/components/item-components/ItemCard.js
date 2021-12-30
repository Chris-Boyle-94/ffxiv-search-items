import { connect } from "react-redux";
import { click } from "../../actions";

const ItemCard = ({ data, setSelectedId, click }) => {
    const { Icon, Name, ID } = data;

    const handleClick = () => {
        setSelectedId(ID);
        click();
    };

    return (
        <div className="items__card" onClick={handleClick}>
            <img src={`https://xivapi.com${Icon}`} alt="Icon" />
            <p className="items__label">{Name}</p>
        </div>
    );
};

export default connect(null, { click })(ItemCard);
