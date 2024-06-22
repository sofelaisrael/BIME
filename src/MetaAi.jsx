import { useState } from "react";
import axios from "axios";

function MetaAi() {
    const [userInput, setUserInput] = useState("");
    const [response, setResponse] = useState("");

    const handleAskButton = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/search', { query: userInput });
            setResponse(response.data.response);
        } catch (error) {
            console.error("Error fetching the API response:", error);
            setResponse("There was an error fetching the response. Please try again.");
        }
    };

    return (
        <div>
            <div id="response-container">{response}</div>
            <input
                id="user-input"
                type="text"
                placeholder="ASK ME A QUESTION"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={handleAskButton} id="ask-button">ASK</button>
        </div>
    );
}

export default MetaAi;

