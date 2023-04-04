import React from "react";
import classes from "./chat.module.css";
import ChatAdvices from "../../components/chatAdvices";
import favouriteAdvice from "../../components/favouriteAdvice";
import FavouriteAdvice from "../../components/favouriteAdvice";
const Chat = () => {

    return (
        <div className={classes.background}>
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