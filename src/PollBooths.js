import { useState, useEffect } from "react";
import firebase from "firebase";
import { Link } from 'react-router-dom';

function PollBooths() {

    const [pollList, setPollList] = useState([]);

    const dbRef = firebase.database().ref("polls");

    useEffect(() => {
        dbRef.on('value', (data) => {
            const pollData = data.val();
            // console.log(pollData);
            const pollBooths = [];

            for (let pollKey in pollData) {
                pollBooths.push({ uniqueKey: pollKey, title: pollData[pollKey].title });
            }
            console.log(pollList);
            setPollList(pollBooths);
        })
    }, []);


    return (
        <section className="poll">
            <h1>Poll Booths</h1>
            {
                pollList.map((key) => {
                    return (
                        <div className="pollBooth">
                            <Link to={`/votepoll/${key.uniqueKey}`} className="link">
                                <h2>{key.title}</h2>
                                {/* <h2>{key.question}</h2> */}
                            </Link>
                        </div>
                    )
                })


            }
        </section>
    )
}

export default PollBooths;