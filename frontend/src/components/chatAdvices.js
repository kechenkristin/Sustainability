import React from "react";

import classes from "./chatAdvices.module.css"
import Advices from "./advices";
import secret from "../secrets/gptKey.txt";
import {useState,useEffect} from "react";
import axios from "axios";

import sendButton from "../assets/sendIcon.png";

const ChatAdvices = () => {

    let response = 'hello';
    const [textData, setTextData] = useState('');
    const [adviceText, setAdviceText] = useState("You can write any action and you will get advices how to make it more sustainable! \n For example: i'm going to drink water! ");

    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isActive, setActive] = useState(false);



    const fetchAdvice = async () => {
        setIsLoading(true);
        const requestBody = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: 'Act as a sustainability expert. There is a user that wants to do the action: '+userInput +
            ". Write exactly 4 advices how to make that action more sustainable.  Use statistic , examples and comparisons to make user motivated about following the advices. Try to sound less generic. Make these advices be numbered. " +
                    "Make one advice be limited by 450 characters"}]

        };

        try {
            const response = await axios.post("https://api.openai.com/v1/chat/completions", requestBody, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${textData}`
                }
            });

            console.log("This is response")

            const advice = response.data.choices[0].message.content;
            setAdviceText(advice);
        } catch (error) {
            console.error("Error fetching advice:", error);
        }
        finally {
            setIsLoading(false);
            setActive(true);
        }
    };

    useEffect(() => {
        fetch(secret)
            .then((response) => response.text())
            .then((data) => setTextData(data))
            .catch((error) => console.error('Error fetching text file:', error));
    }, []);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    return (
        <div className={classes.chatItems}>
            {isLoading ? "Loading..." : <Advices response={adviceText} active={isActive} question={userInput}>
            </Advices>}

            <div className={classes.submit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    className={classes.input}
                    placeholder="Enter your request"
                />
                <button className={classes.fetchButton} onClick={fetchAdvice}><img src={sendButton} className={classes.sendButton}/> </button>
            </div>
        </div>
    )
}

export default ChatAdvices;