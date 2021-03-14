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
    
    const totalCount = poll.Yes + poll.No;

    return (
        <section className="poll">
            <h1>{poll.title}</h1>
            <p>Thank you for voting!</p>
            <div className="results">
                <h3>Results</h3>
                <h4>Number of Voters: {totalCount}</h4>
                <h4>{poll.question}</h4>
                <p>Yes: {poll.Yes}</p>
                <p>No: {poll.No}</p>
            </div>
        </section>
    )
}

export default Results;