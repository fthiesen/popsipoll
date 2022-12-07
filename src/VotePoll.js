import firebase from "firebase";
import { useState, useEffect } from 'react';

function VotePoll(props) {

    //Initialize state to store poll information from firebase
    const [poll, setPoll] = useState("");
    //Initialize state to store form answer changes to store in database
    const [answers, setAnswers] = useState("");
    //Initialize state to store answer names in an array
    const [answersNames, setAnswersNames] = useState([]);
    //Initialize state to see if data is loaded to page
    const [isLoading, setIsLoading] = useState(true);

    //Key to store in local storage
    const localStorageKey = props.match.params.uniqueKey;

    useEffect(() => {
        const pollKey = props.match.params.uniqueKey;
        const dbRef = firebase.database().ref("polls").child(pollKey);

        dbRef.once('value', (data) => {
            const pollData = data.val();
            setPoll(pollData);
            setIsLoading(false);
            const answersNames = Object.keys(pollData.answers);
            setAnswersNames(answersNames);
        })
    }, [props.match.params.uniqueKey]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const key = props.match.params.uniqueKey;
        //Check if user has not voted on the same poll
        if (localStorage.getItem(localStorageKey) !== key) {
            //If user has not voted on poll, set key to local storage
            localStorage.setItem(localStorageKey, key);

            const copiedPoll = { ...poll };

            //Finds answer user chose and increments vote
            for (let answer in copiedPoll.answers) {
                if (answers === answer) {
                    copiedPoll.answers[answer].votes++;
                }
            }

            const dbRef = firebase.database().ref("polls").child(key);
            dbRef.set(copiedPoll);

            //Redirects user to Results.js and passes key in url
            dbRef.on('value', () => {
                window.location.replace(`/results/${key}`);
            });

        } else {
            alert("You already voted for this question!");
        }

    }

    const handleChange = (e) => {
        setAnswers(e.target.id);
    }

    return (
        <section className="poll" id="main-content">
            {
                isLoading ? <h2>Loading poll...</h2>
                    :
                    !poll
                        ? <h1>Sorry! Poll not found.</h1>
                        : <>
                            <h1>{poll.title}</h1>
                            <form onSubmit={handleSubmit}>
                                <h2>{poll.question}</h2>
                                {
                                    answersNames.map((answerName, index) => {
                                        return (
                                            <div className="radio" key={index}>
                                                <input type="radio" id={answerName} name="option" value={poll.answers[answerName].title} required onChange={handleChange} />
                                                <label htmlFor={answerName}>{poll.answers[answerName].title}</label>
                                            </div>
                                        )
                                    })
                                }
                                <button>Vote</button>
                            </form>
                        </>
            }
        </section>
    )
}

export default VotePoll;