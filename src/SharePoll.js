function SharePoll(props) {
    // console.log(props.uniqueKey);

    const baseUrl = window.location.origin;
    const newUrl = baseUrl + "/votepoll/" + props.match.params.uniqueKey;

    const copyUrl = () => {
        const text = document.getElementById("newUrl");
        text.select();
        document.execCommand("copy");
    }

    return (
        <section className="poll">
            <h1>Congrats!</h1>
            <h2>Your poll was created successfully</h2>
            <p>Share your poll with friends:</p>
            <input readOnly type="text" value={newUrl} id="newUrl"/>
            <button onClick={copyUrl}>Clipboard</button>
        </section>

    )
}

export default SharePoll;