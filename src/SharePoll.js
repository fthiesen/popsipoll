//Component to render poll after creation of poll and displays link to share
function SharePoll(props) {

    const baseUrl = window.location.origin;
    const newUrl = baseUrl + "/votepoll/" + props.match.params.uniqueKey;

    //Function to copy url for creator to share poll
    const copyUrl = () => {
        const text = document.getElementById("newUrl");
        text.select();
        document.execCommand("copy");
    }

    //Function to redirect to VotePoll.js
    const redirect = () => {
        window.location.replace(newUrl);
    }

    return (
        <section className="poll" id="main-content">
            <h1>Congrats!</h1>
            <h2>Your poll was created successfully</h2>
            <p>Share your poll with friends:</p>
            <input className="url" readOnly type="text" value={newUrl} id="newUrl"/>
            <div>
                <button onClick={copyUrl}>Copy URL</button>
                <button onClick={redirect}>View Poll</button>
            </div>
        </section>

    )
}

export default SharePoll;