function PreviewPoll(props) {

    return (
        <section className="poll">
            <h1>{props.formFields.title}</h1>
            <form>
                <h2>{props.formFields.question}</h2>
                <div className="radio">
                    <input type="radio" id="option1" name="option" value={props.formFields.answers.option1.title} required />
                    <label htmlFor="option1">{props.formFields.answers.option1.title}</label>
                </div>
                <div className="radio">
                    <input type="radio" id="option2" name="option" value={props.formFields.answers.option2.title} required />
                    <label htmlFor="option2">{props.formFields.answers.option2.title}</label>
                </div>
                <button>Vote</button>
                <button className="backButton" onClick={() => { props.setPreview(!props.preview) }}>Back</button>
            </form>
        </section>
    )
}

export default PreviewPoll;