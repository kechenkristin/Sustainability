import React from "react";
import classes from "./chat.module.css";
import ChatAdvices from "../../components/chatAdvices";
import favouriteAdvice from "../../components/favouriteAdvice";
import FavouriteAdvice from "../../components/favouriteAdvice";

import greenways from "../../assets/greenways.png";
const Chat = () => {

    return (
        <div className={classes.background}>
            <div className={classes.logo}>
                <a href = '/'><img src={greenways} className={classes.logoPhoto}/> </a>
            </div>
            <div className={classes.left}>
                <ChatAdvices/>
            </div>
            <div className={classes.right}>
                <div className={classes.favouriteLogo}>
                    Favourite tips
                </div>
                <FavouriteAdvice/>
            </div>
        </div>
    )
}

export default Chat;