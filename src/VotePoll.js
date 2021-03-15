import firebase from "firebase";
import { useState, useEffect } from 'react';

function VotePoll(props) {

    const [poll, setPoll] = useState("");
    const [answers, setAnswers] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const key = props.match.params.uniqueKey;
    
    useEffect(() => {
    
        const dbRef = firebase.database().ref("polls").child(key);

        dbRef.once('value', (data) => {
            setPoll(data.val());
            setIsLoading(false);
        })
    }, [props.match.params]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const copiedPoll = {...poll};

        let answerCount = poll[answers];
        answerCount++;

        copiedPoll[answers] = answerCount;

        const dbRef = firebase.database().ref("polls").child(key);
        dbRef.set(copiedPoll);

        console.log(`/results/${key}`);
        dbRef.on('value', () => {
            window.location.replace(`/results/${key}`);
        });

    }

    const handleChange = (e) => {
        setAnswers(e.target.value);
    }

    return (
        <section className="poll">
            {
                isLoading ? <h2>Loading poll...</h2>
                :
                    !poll
                    ? <h1>Sorry! Poll not found.</h1>
                    : <>
                    <h1>{poll.title}</h1> 
                    <form onSubmit={handleSubmit}>
                        <h2>{poll.question}</h2>
                            <div className="radio">
                                <input type="radio" id="option1" name="option" value="Yes" required onChange={handleChange} />
                                <label htmlFor="option1">Yes</label>
                            </div>
                            <div className="radio">
                                <input type="radio" id="option2" name="option" value="No" required onChange={handleChange}/>
                                <label htmlFor="option2">No</label>
                            </div>
                        <button>Vote</button>
                    </form>
                    </>
            }           
        </section>
    )
}

export default VotePoll;