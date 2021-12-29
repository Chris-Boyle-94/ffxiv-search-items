import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ItemCard from "./item-components/ItemCard";
import Spinner from "./Spinner";
import ItemDetails from "./item-components/ItemDetails";

const FavoritesPage = ({ clicked }) => {
    const [userFavorites, setUserFavorites] = useState([]);
    const [favoritesList, setFavoritesList] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    const baseUrl = process.env.baseUrl || "http://localhost:3333";
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
        return () => console.log("clean up");
    }, []);

    useEffect(() => {
        getItems();
        return () => console.log("clean up");
        // eslint-disable-next-line
    }, [userFavorites]);

    return (
        <div>
            <h1>User's favorited items</h1>
            {favoritesList.length < 1 ? (
                <Spinner />
            ) : !clicked || targetItem === undefined ? (
                favoritesList.map((favorite) => {
                    return (
                        <ItemCard
                            data={favorite}
                            key={favorite.favorite_id}
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
    };
};

export default connect(mapStateToProps)(FavoritesPage);
