import { useEffect, useState } from "react";

import axios from "axios";
import { connect } from "react-redux";
import { click } from "../../actions";

const ItemDetails = ({ targetItem, click }) => {
    const [data, setData] = useState({});
    const { Url, ID } = targetItem;
    const userId = localStorage.getItem("user_id");
    const encodedUrl = encodeURI(Url);
    const baseUrl = process.env.baseUrl || "http://localhost:3333";

    const requestInfo = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/items/search?url=${encodedUrl}`
            );
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        requestInfo();
        //eslint-disable-next-line
    }, []);

    const handleClick = () => {
        click();
    };

    /**
     for the future: dealing with showing favorite or delete

     const handleGetFavorite = async () => {
         try {
             const response = await axios.get(`${baseUrl}/favorites/${userId}`);
             console.log(response.data);
         } catch (err) {
             console.log(err);
         }
     };
     */

    const handlePostFavorite = () => {
        axios.post(`${baseUrl}/favorites/`, {
            user_id: userId,
            item_id: ID,
        });
    };

    const handleDeleteFavorite = () => {
        axios.delete(`${baseUrl}/favorites/`, {
            data: {
                user_id: userId,
                item_id: ID,
            },
        });
    };

    return (
        <div>
            {!data.Name ? null : (
                <div className="items__details" onClick={handleClick}>
                    <img
                        className="items__details__icon"
                        src={`https://xivapi.com${data.IconHD}`}
                        alt="Icon"
                    />
                    <h2 className="items__details__h2">{data.Name}</h2>
                    <h4 className="items__details__h4">{data.Name_ja}</h4>
                    {data.ClassJobUse ? (
                        <p className="items__details__p">
                            Class: {data.ClassJobCategory.Name}
                        </p>
                    ) : null}
                    {data.DamagePhys > 0 ? (
                        <p className="items__details__p">
                            Physical Damage: {data.DamagePhys}
                        </p>
                    ) : null}
                    {data.DamageMag > 0 ? (
                        <p className="items__details__p">
                            Magical Damage: {data.DamageMag}
                        </p>
                    ) : null}
                    {data.DefensePhys > 0 ? (
                        <p className="items__details__p">
                            Physical Defense: {data.DefensePhys}
                        </p>
                    ) : null}
                    {data.DefenseMag > 0 ? (
                        <p className="items__details__p">
                            Magical Defense: {data.DefenseMag}
                        </p>
                    ) : null}
                    {data.Description !== "" ? (
                        <p className="items__details__p">{data.Description}</p>
                    ) : null}
                    {userId && (
                        <div className="items__details__buttons">
                            <button
                                className="items__button"
                                onClick={handlePostFavorite}
                            >
                                Favorite this item
                            </button>
                            <button
                                className="items__button"
                                onClick={handleDeleteFavorite}
                            >
                                Delete this favorite
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default connect(null, { click })(ItemDetails);
