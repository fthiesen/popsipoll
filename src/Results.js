import { useState, useEffect } from "react";
import firebase from "firebase";

//Component to render results of poll to user after voting
function Results(props) {

    //Initialize state to store poll information from firebase
    const [poll, setPoll] = useState("");
    //Initialize state to see if data is loaded to page
    const [isLoading, setIsLoading] = useState(true);
    //Initialize state to store answer names in an array
    const [answersNames, setAnswersNames] = useState([]);

    useEffect(() => {
        const key = props.match.params.uniqueKey;

        const dbRef = firebase.database().ref("polls").child(key);
        dbRef.once('value', (data) => {
            const pollData = data.val();
            setPoll(pollData);
            setIsLoading(false);
            const answersNames = Object.keys(pollData.answers);
            setAnswersNames(answersNames);
        })
    }, [props.match.params]);

    //Counter to add all votes
    let totalCount = 0;
    if (poll) {
        for (let answer in poll.answers) {
            totalCount = totalCount + poll.answers[answer].votes;
        }
    }

    return (
        <section className="poll">
            {
                isLoading ? <h2>Loading results...</h2>
                    :
                    !poll
                        ? <h1>Sorry! Poll not found.</h1>
                        : <>
                            <h1>{poll.title}</h1>
                            <h2>Thank you for voting!</h2>
                            <div className="results">
                                <h3>Results</h3>
                                <p><span className="bold">Number of Voters:</span> {totalCount}</p>
                                <p><span className="bold">{poll.question}</span></p>
                                {
                                    answersNames.map((answerName, index) => {
                                        return (
                                            <p key={index}>{poll.answers[answerName].title}: {poll.answers[answerName].votes}</p>
                                        )
                                    })
                                }
                            </div>
                        </>
            }
        </section>
    )
}

export default Results;