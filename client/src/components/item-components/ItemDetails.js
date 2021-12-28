import { useEffect, useState } from "react";

import Spinner from "../Spinner";
import axios from "axios";
import { connect } from "react-redux";
import { click } from "../../actions";

const ItemDetails = ({ targetItem, click }) => {
    const [data, setData] = useState({});
    const { Url, ID } = targetItem;
    const userId = localStorage.getItem("user_id");
    console.log(userId);
    const encodedUrl = encodeURI(Url);
    const baseUrl = process.env.baseUrl || "http://localhost:3333";

    const requestInfo = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/items/${ID}?url=${encodedUrl}`
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

    const handleFavorite = async () => {
        try {
            const response = await axios.post(`${baseUrl}/favorites/`, {
                user_id: userId,
                item_id: ID,
            });
            console.log("res", response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {!data.Name ? (
                <Spinner />
            ) : (
                <div>
                    <img
                        src={`https://xivapi.com${data.IconHD}`}
                        alt="Icon"
                        onClick={handleClick}
                    />
                    <h2>{data.Name}</h2>
                    <h4>{data.Name_ja}</h4>
                    {data.ClassJobUse ? (
                        <p>Class: {data.ClassJobCategory.Name}</p>
                    ) : null}
                    {data.DamagePhys > 0 ? (
                        <p>Physical Damage: {data.DamagePhys}</p>
                    ) : null}
                    {data.DamageMag > 0 ? (
                        <p>Magical Damage: {data.DamageMag}</p>
                    ) : null}
                    {data.DefensePhys > 0 ? (
                        <p>Physical Defense: {data.DefensePhys}</p>
                    ) : null}
                    {data.DefenseMag > 0 ? (
                        <p>Magical Defense: {data.DefenseMag}</p>
                    ) : null}
                    {data.Description !== "" ? <p>{data.Description}</p> : null}
                    <button onClick={handleFavorite}>Favorite this item</button>
                </div>
            )}
        </div>
    );
};

export default connect(null, { click })(ItemDetails);
