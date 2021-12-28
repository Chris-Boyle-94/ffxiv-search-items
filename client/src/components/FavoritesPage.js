import { useEffect, useRef } from "react";
import axios from "axios";
import ItemCard from "./item-components/ItemCard";
import Spinner from "./Spinner";

const FavoritesPage = () => {
    const baseUrl = process.env.baseUrl || "http://localhost:3333";
    const userId = localStorage.getItem("user_id");

    const favorites = useRef(null);
    const items = useRef(null);
    useEffect(() => {
        axios
            .get(`${baseUrl}/favorites/${userId}`)
            .then((res) => {
                favorites.current = res.data;
                console.log(favorites.current.item_id);
                axios
                    .get(`${baseUrl}/items/${favorites.current.item_id}`)
                    .then((res) => {
                        console.log(res);
                    });
            })
            .catch((err) => console.log(err));
    }, []);

    console.log(favorites.current);
    return (
        <div>
            <h1>User's favorited items</h1>
            {favorites.current === null ? (
                <Spinner />
            ) : (
                favorites.current.map((favorite) => {
                    return (
                        <ItemCard data={favorite} key={favorite.favorite_id} />
                    );
                })
            )}
        </div>
    );
};

export default FavoritesPage;
