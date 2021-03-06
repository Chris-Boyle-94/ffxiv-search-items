import { useEffect, useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

import { connect } from "react-redux";
import { click, setUserFavorites } from "../../actions";

const ItemDetails = ({
    targetItem,
    click,
    userFavorites,
    setUserFavorites,
}) => {
    const [data, setData] = useState({});
    const [hasFavorite, setHasFavorite] = useState(false);
    const [userId, setUserId] = useState("");
    const { Url, ID } = targetItem;
    const encodedUrl = encodeURI(Url);
    const development = "http://localhost:3333";
    const production = "https://moghead.herokuapp.com";
    const baseUrl =
        process.env.NODE_ENV === "production" ? production : development;

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

    const favorite = userFavorites.find((item) => {
        return ID === item.item_id;
    });

    const getUserId = async () => {
        const response = await axiosWithAuth().get(`${baseUrl}/users`);
        setUserId(response.data);
    };

    const handleHasFavorite = async () => {
        try {
            const response = await axiosWithAuth().post(
                `${baseUrl}/favorites/specific`,
                {
                    item_id: ID,
                }
            );

            if (response.data.length > 0) {
                setHasFavorite(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUserId();
        requestInfo();
        handleHasFavorite();
        //eslint-disable-next-line
    }, []);

    const handleClick = () => {
        click(false);
    };

    const handlePostFavorite = () => {
        axiosWithAuth().post(`${baseUrl}/favorites/`, {
            item_id: ID,
        });
    };

    const handleDeleteFavorite = () => {
        axiosWithAuth().delete(`${baseUrl}/favorites/`, {
            data: {
                item_id: ID,
            },
        });
        setUserFavorites(
            userFavorites.filter((userFavorite) => {
                return favorite !== userFavorite;
            })
        );
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
                    {data.ClassJobUse && (
                        <p className="items__details__p">
                            Class: {data.ClassJobCategory.Name}
                        </p>
                    )}
                    {data.DamagePhys > 0 && (
                        <p className="items__details__p">
                            Physical Damage: {data.DamagePhys}
                        </p>
                    )}
                    {data.DamageMag > 0 && (
                        <p className="items__details__p">
                            Magical Damage: {data.DamageMag}
                        </p>
                    )}
                    {data.DefensePhys > 0 && (
                        <p className="items__details__p">
                            Physical Defense: {data.DefensePhys}
                        </p>
                    )}
                    {data.DefenseMag > 0 && (
                        <p className="items__details__p">
                            Magical Defense: {data.DefenseMag}
                        </p>
                    )}
                    {data.Description !== "" && (
                        <p className="items__details__p">{data.Description}</p>
                    )}
                    {userId && (
                        <div className="items__details__buttons">
                            {hasFavorite ? (
                                <button
                                    className="items__button"
                                    onClick={handleDeleteFavorite}
                                >
                                    Delete this favorite
                                </button>
                            ) : (
                                <button
                                    className="items__button"
                                    onClick={handlePostFavorite}
                                >
                                    Favorite this item
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userFavorites: state.userFavorites,
    };
};

export default connect(mapStateToProps, { click, setUserFavorites })(
    ItemDetails
);
