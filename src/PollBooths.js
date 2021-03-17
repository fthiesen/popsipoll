import { useState, useEffect } from "react";
import firebase from "firebase";
import { Link } from 'react-router-dom';

function PollBooths() {

    //Initialize state to store poll information from firebase
    const [pollList, setPollList] = useState([]);

    useEffect(() => {
        const dbRef = firebase.database().ref("polls");
        dbRef.on('value', (data) => {
            const pollData = data.val();
            const pollBooths = [];

            for (let pollKey in pollData) {
                pollBooths.push({ uniqueKey: pollKey, title: pollData[pollKey].title });
            }
            setPollList(pollBooths);
        })
    }, []);


    return (
        <section className="poll">
            <h1>Poll Booths</h1>
            {
                pollList.map((key) => {
                    return (
                        <div className="pollBooth" key={key.uniqueKey}>
                            <Link to={`/votepoll/${key.uniqueKey}`} className="link">
                                <h2>{key.title}</h2>
                            </Link>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default PollBooths;