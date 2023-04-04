import React, { useState, useEffect } from "react";

import classes from "./favouriteAdvice.module.css"

const FavouriteAdvice = () => {
    const [favourites, setFavourites] = useState(['Make tea','Be happy','Dance']);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     fetch("http://localhost:8000/favourites")
    //         .then(response => response.json())
    //         .then(data => {
    //             setFavourites(data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             setLoading(false);
    //         });
    // }, []);

    return (
        <div className={classes.board}>
            {loading ? (
                <div className={classes.loading}>No items</div>
            ) : favourites.length > 0 ? (
                favourites.map((favourite, index) => (
                    <div key={index} className={classes.article}>
                        {favourite}
                    </div>
                ))
            ) : (
                <div className={classes.noItems}>No items</div>
            )}
        </div>
    )
}

export default FavouriteAdvice;
