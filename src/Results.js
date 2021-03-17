import { useState, useEffect } from "react";
import firebase from "firebase";

function Results(props) {

    const [poll, setPoll] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [alertNumber, setAlertNumber] = useState(5);
    
    useEffect(() => {   
        const key = props.match.params.uniqueKey;
        
        const dbRef = firebase.database().ref("polls").child(key);
        
        dbRef.once('value', (data) => {
            setPoll(data.val());
            setIsLoading(false);
        }); 
        
        // const script = document.createElement('script');

        // script.src = "https://smtpjs.com/v3/smtp.js";
        // script.async = true;

        // console.log(poll);

        // window.Email.send({
        //     Host: "smtp.yourisp.com",
        //     Username: "username",
        //     Password: "password",
        //     To: 'jakejonggubaek@gmail.com',
        //     From: "no-reply@popsipoll.com",
        //     Subject: "Reminder for your poll",
        //     Body: `${alertNumber} people voted so far!`
        // }).then(
        //     message => alert(message)
        // );


    }, [props.match.params]);
    
    let totalCount;
    if (poll) {
        totalCount = poll.answers.option1.votes + poll.answers.option2.votes;
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
                        <p>{poll.answers.option1.title}: {poll.answers.option1.votes}</p>
                        <p>{poll.answers.option2.title}: {poll.answers.option2.votes}</p>
                    </div>
                    </>
            }
        </section>
    )
}

export default Results;