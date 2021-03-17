import firebase from "firebase";
import { useState, useEffect } from 'react';

function VotePoll(props) {

    const [poll, setPoll] = useState("");
    const [answers, setAnswers] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const key = props.match.params.uniqueKey;
    const localStorageKey = "PopsiPoll_key"
    
    useEffect(() => {
    
        const dbRef = firebase.database().ref("polls").child(key);

        dbRef.once('value', (data) => {
            setPoll(data.val());
            setIsLoading(false);
        })

    }, [props.match.params]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (localStorage.getItem(localStorageKey) !== props.match.params.uniqueKey) {

            localStorage.setItem(localStorageKey, props.match.params.uniqueKey);
            
            const copiedPoll = {...poll};
            let answerCount = 0;

            if(answers === "option1") {
                answerCount = poll.answers.option1.votes;
                answerCount++;
                copiedPoll.answers.option1.votes = answerCount;
            }else {
                answerCount = poll.answers.option2.votes;
                answerCount++;
                copiedPoll.answers.option2.votes = answerCount;
            }
        
            const dbRef = firebase.database().ref("polls").child(key);
            dbRef.set(copiedPoll);

            dbRef.on('value', () => {
                window.location.replace(`/results/${key}`);
            });

        }else {
            alert("You already voted for this question!");
        }

    }

    const handleChange = (e) => {
        setAnswers(e.target.id);
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
                                <input type="radio" id="option1" name="option" value={poll.answers.option1.title} required onChange={handleChange} />
                                <label htmlFor="option1">{poll.answers.option1.title}</label>
                            </div>
                            <div className="radio">
                                <input type="radio" id="option2" name="option" value={poll.answers.option2.title} required onChange={handleChange}/>
                                <label htmlFor="option2">{poll.answers.option2.title}</label>
                            </div>
                        <button>Vote</button>
                    </form>
                    </>
            }           
        </section>
    )
}

export default VotePoll;