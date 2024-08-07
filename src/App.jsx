import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import "./App.css";

const App = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", ".", "=", "C"];

    const handleClick = (button) => {
        if (button === "=") {
            try {
                const calculatedResult = evaluate(input);
                setResult(calculatedResult.toString());
                setInput("");
            } catch (error) {
                setResult("Error");
            }
        } else if (button === "C") {
            setInput("");
            setResult("");
        } else {
            const lastChar = input.slice(-1);
            if (
                ["+", "-", "*", "/", "."].includes(button) &&
                ["+", "-", "*", "/", "."].includes(lastChar)
            ) {
                return;
            }
            setInput((prevInput) => prevInput + button);
        }
    };

    const handleKeyPress = (event) => {
        const key = event.key;
        if (key === "=" || key === "Enter") {
            event.preventDefault();
            handleClick(key);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <div className="centre">
           <h2>Nkanta's Calculator</h2>
           <div className="calculater">
            <div className="display">
              <div className="inputDisplay">{input}</div>
              <div className="resultDisplay">{result}</div>
            </div>

            <div className="buttonWrap">
                {buttons.map(
                    (
                        button,
                    ) => (
                        <button key={index} onClick={() => handleClick(button)} className={`btn ${!isNaN(button) ? "numberBtn" : ""} ${
                            button === "C" ? "clearBtn" : ""
                        }`}
                        style={{gridColumn: button === "C" ? "span 2" : "auto"}}
                        >
                            {button}
                        </button>
                    )
                )}
            </div>
           </div>
        </div>
    );
};

export default App;
