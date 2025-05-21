import "./Question.css"
import { useState } from 'react'

function Question(){

    const [choice, setChoice] = useState(0);

    return (
        <>
        <div className="main">
            <div className="question-div">
                <button className="q-button">{"< Previous"}</button>
                <h3>Q3: What division are the Chicago Bears in?</h3>
                <button className="q-button">{"Next >"}</button>
            </div>
            <div className="top-questions">
                <div 
                    className={choice === 1 ? "selected-question-box question-box" : "question-box"}
                    onClick={() => {setChoice(1)}}
                >
                    <div className="answer-div">
                        <div className="letter-div"><h4>{"A."}</h4></div>
                        <div className="answer-text-div"><p>NFC South</p></div>
                    </div>
                </div>
                <div 
                    className={choice === 2 ? "selected-question-box question-box" : "question-box"}
                    onClick={() => {setChoice(2)}}
                >
                    <div className="answer-div">
                        <div className="letter-div"><h4>{"B."}</h4></div>
                        <div className="answer-text-div"><p>NFC North</p></div>
                    </div>
                </div>
            </div>
            <div className="bottom-questions">
                <div 
                    className={choice === 3 ? "selected-question-box question-box" : "question-box"}
                    onClick={() => {setChoice(3)}}
                >
                    <div className="answer-div">
                        <div className="letter-div"><h4>{"C."}</h4></div>
                        <div className="answer-text-div"><p>NFC West</p></div>
                    </div>
                </div>
                <div 
                    className={choice === 4 ? "selected-question-box question-box" : "question-box"}
                    onClick={() => {setChoice(4)}}
                >
                    <div className="answer-div">
                        <div className="letter-div"><h4>{"D."}</h4></div>
                        <div className="answer-text-div"><p>NFC East</p></div>
                    </div>
                </div>
            </div>
            <div className="control-div">
                <button className="submit">Submit</button>
                <button className="help">Get Help</button>
            </div>
        </div>
        </>
    )
}

export default Question