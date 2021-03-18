//Component for creator to view poll before submitting poll
function PreviewPoll(props) {

    return (
        <section className="poll" id="main-content">
            <h1>{props.formFields.title}</h1>
            <form>
                <h2>{props.formFields.question}</h2>
                {
                    props.answersNames.map((answerName, index) => {
                        return (
                            <div className="radio" key={index}>
                                <input type="radio" id={answerName} name="option" value={props.formFields.answers[answerName].title} required />
                                <label htmlFor={answerName}>{props.formFields.answers[answerName].title}</label>
                            </div>
                        )
                    })
                }
            </form>
                <button onClick={()=>{alert("This is just a preview. You cannot vote in the preview.")}}>Vote</button>
            <button className="backButton" onClick={() => { props.setPreview(!props.preview) }}>Back</button>
        </section>
    )
}

export default PreviewPoll;