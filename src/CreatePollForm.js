function CreatePollForm(props) {
    return (
        <section className="poll">
            <h1>Create A Poll</h1>
            <form onSubmit={props.handleSubmit}>
                <label htmlFor="title" className="sr-only">Poll Title</label>
                <input name="title" id="title" type="text" placeholder="Poll Title" onChange={props.handleChange} value={props.formFields.title} required />
                <label htmlFor="question" className="sr-only">Question</label>
                <input name="question" id="question" type="text" placeholder="Question" onChange={props.handleChange} value={props.formFields.question} required />
                {
                    props.options.map((answerName, index) => {
                        return (
                            <div key={index}>
                                <label htmlFor={answerName} className="sr-only">{answerName}</label>
                                <input type="text" name={answerName} id={answerName} className="option" placeholder="Type an answer option here" value={props.formFields.answers[answerName].title} onChange={props.handleChangeAnswers} required />
                            </div>
                        )
                    })
                }
                <button type='submit'>Create Poll</button>
            </form>
                <button onClick={props.addOptions}>Add more options</button>
                <button onClick={() => { props.setPreview(!props.preview) }} input={props.formFields}>Preview Poll</button>
        </section>
    )
}

export default CreatePollForm;