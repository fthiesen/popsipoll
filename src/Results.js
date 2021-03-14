import { useState, useEffect } from "react";
import firebase from "firebase";

function Results(props) {

    const [poll, setPoll] = useState("");

    const key = props.match.params.uniqueKey;

    const dbRef = firebase.database().ref("polls").child(key);

    useEffect(() => {   
        dbRef.once('value', (data) => {
            setPoll(data.val());
        })
    }, []);
    
    let totalCount;
    if (poll) {
        totalCount = poll.Yes + poll.No;
    }

    return (
        <section className="poll">
            {
                !poll
                ? <h1>Sorry! Poll not found.</h1>
                : <>
                <h1>{poll.title}</h1> 
                <h2>Thank you for voting!</h2>
                <div className="results">
                    <h3>Results</h3>
                    <p><span className="bold">Number of Voters:</span> {totalCount}</p>
                    <p><span className="bold">{poll.question}</span></p>
                    <p>Yes: {poll.Yes}</p>
                    <p>No: {poll.No}</p>
                </div>
                </>
            }
        </section>
    )
}

export default Results;