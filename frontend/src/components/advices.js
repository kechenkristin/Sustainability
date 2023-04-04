import React, { useState } from "react";
import axios from "axios";

import classes from "./advices.module.css";

import liked from "../assets/liked.png";
import notLiked from "../assets/notLiked.png";

const Advices = ({ response, active , question}) => {
    const articles = response.split('\n').filter(article => article.trim() !== '');
    const [likes, setLikes] = useState(Array(articles.length).fill(false));

    const toggleLike = async (index) => {
        const newLikes = [...likes];
        newLikes[index] = !newLikes[index];
        setLikes(newLikes);

        try {
            await axios.post("http://localhost:8000/advice/like_advice/", {
                text: articles[index],
                question:question,
            });
        } catch (error) {
            console.error("Error sending favorite status:", error);
        }
    };

    return (
        <div className={classes.board}>
            {articles.map((article, index) => (
                <div className={classes.item} key={index}>
                    <div className={classes.article}>{article}</div>
                    {active && (
                        <div className={classes.likeButton} onClick={() => toggleLike(index)}>
                            <img
                                src={likes[index] ? liked : notLiked}
                                alt="Like button"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Advices;
