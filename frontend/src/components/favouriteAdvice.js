import React, { useState, useEffect } from "react";

import classes from "./favouriteAdvice.module.css"
import axios from "axios";

const FavouriteAdvice = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            fetch("https://c568-144-173-23-52.ngrok.io/advice/favorite_advices/")
                .then(response => response.json())
                .then(data => {
                    const updatedData = data.map((item) => {
                        const newText = item.text.replace(/^\d+\.\s*/, "");
                        return {
                            ...item,
                            text: `[${item.question}] ${newText}`,
                        };
                    });
                    setFavourites(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        };

        fetchData(); // Fetch data immediately when the component mounts
        const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

        // Clean up the interval when the component is unmounted
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleButtonClick = async (index) => {
        try {
            const response = await axios.post(
                "https://c568-144-173-23-52.ngrok.io/advice/increase/",
                {text: favourites[index].text}
            );
            console.log(response.data);
            const updatedFavourites = [...favourites];
            updatedFavourites[index].likes += 1;
            setFavourites(updatedFavourites);
        } catch (error) {
            console.error("Error incrementing likes:", error);
        }
    };

    return (
        <div className={classes.board}>
            {loading ? (
                <div className={classes.loading}>No items</div>
            ) : favourites.length > 0 ? (
                favourites.map((favourite, index) => (
                    <div key={index} className={classes.articleContainer}>
                        <div key={index} className={classes.article}>
                            {'['+favourite.question+'] '+favourite.text.slice(3)}
                        </div>
                        <button
                            className={classes.circleButton}
                            onClick={() => handleButtonClick(index)}>
                            {favourites[index].likes}
                        </button>
                    </div>
                ))
            ) : (
                <div className={classes.noItems}>No items</div>
            )}
        </div>
    )
}

export default FavouriteAdvice;
