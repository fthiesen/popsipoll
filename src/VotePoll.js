import firebase from "firebase";
import { useState, useEffect } from 'react';

function VotePoll(props) {

    const [poll, setPoll] = useState("");
    const [answers, setAnswers] = useState("");

    const key = props.match.params.uniqueKey;

    //handle error here
    const dbRef = firebase.database().ref("polls").child(key);

    useEffect(() => {

        dbRef.once('value', (data) => {
            setPoll(data.val());
        })

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // console.log(poll);
        
        let answerCount = poll[answers];

        answerCount++;

        // console.log(answerCount);
        
        const dbRef = firebase.database().ref("polls").child(key);

        console.log(dbRef);

        console.log(key);

        // setPoll(answerCount);

        // dbRef.update({answers: answerCount});


    }

    const handleChange = (e) => {
        setAnswers(e.target.value);


    }

    return (
        <section className="poll">
            <h1>{poll.title}</h1>
            <form onSubmit={handleSubmit}>
                <h2>{poll.question}</h2>
                    <label htmlFor="option1">Yes</label>
                    <input type="radio" id="option1" name="option" value="Yes" required onChange={handleChange} />
                    <label htmlFor="option2">No</label>
                    <input type="radio" id="option2" name="option" value="No" required onChange={handleChange}/>
                <button>Vote</button>
            </form>
        </section>
    )
}

export default VotePoll;