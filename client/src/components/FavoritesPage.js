import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ItemCard from "./item-components/ItemCard";
import ItemDetails from "./item-components/ItemDetails";
import { setUserFavorites } from "../actions";
import { v4 as uuidv4 } from "uuid";

const FavoritesPage = ({ clicked, setUserFavorites, userFavorites }) => {
    const [favoritesList, setFavoritesList] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    const development = "http://localhost:3333";
    const production = "https://moghead.herokuapp.com/";
    const baseUrl = process.env.NODE_ENV ? production : development;
    const userId = localStorage.getItem("user_id");

    const targetItem = favoritesList.find((item) => {
        return item.ID === selectedId;
    });

    const getUserFavorites = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}/favorites/${userId}`);
            setUserFavorites(response.data);
        } catch (err) {
            console.log(err);
        }
        //eslint-disable-next-line
    }, [baseUrl, userId]);

    const getItems = () => {
        userFavorites.map(async (favorite) => {
            try {
                const response = await axios.get(
                    `${baseUrl}/items/${favorite.item_id}`
                );
                setFavoritesList((favoritesList) => [
                    ...favoritesList,
                    response.data[0],
                ]);
            } catch (err) {
                console.log(err);
            }
        });
    };

    useEffect(() => {
        getUserFavorites();
        return () => setUserFavorites([]);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getItems();
        return () => setFavoritesList([]);
        // eslint-disable-next-line
    }, [userFavorites]);

    return (
        <div className="items">
            {favoritesList.length < 1 ? null : !clicked ||
              targetItem === undefined ? (
                favoritesList.map((favorite) => {
                    return (
                        <ItemCard
                            data={favorite}
                            key={uuidv4()}
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
        clicked: state.clicked,
        userFavorites: state.userFavorites,
    };
};

export default connect(mapStateToProps, { setUserFavorites })(FavoritesPage);
