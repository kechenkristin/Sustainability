import React, { useState, useEffect } from "react";

import classes from "./favouriteAdvice.module.css"
import axios from "axios";

const FavouriteAdvice = () => {
    const [favourites, setFavourites] = useState(['Make tea','Be happy','Dance']);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            fetch("http://localhost:8000/advice/favorite_advices/")
                .then(response => response.json())
                .then(data => {
                    const updatedData = data.map((item) => {
                        const newText = item.text.replace(/^\d+\.\s*/, "");
                        return {
                            ...item,
                            text: `[${item.question}] ${newText}`,
                        };
                    });
                    setFavourites(updatedData);
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
                "http://localhost:8000/advice/increment_likes/",
                { text: favourites[index].text }
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
                            {favourite.text}
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
