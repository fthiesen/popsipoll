function CreatePollForm(props) {
    return (
        <section className="poll">
            <h1>Create A Poll</h1>
            <form onSubmit={props.handleSubmit}>
                <label htmlFor="title" className="sr-only">Poll Title</label>
                <input name="title" id="title" type="text" placeholder="Poll Title" onChange={props.handleChange} value={props.formFields.title} required />
                <label htmlFor="question" className="sr-only">Question</label>
                <input name="question" id="question" type="text" placeholder="Question" onChange={props.handleChange} value={props.formFields.question} required />
                <label htmlFor="option1" className="sr-only">Option1</label>
                <input type="text" name="option1" id="0" className="option" placeholder="Yes" value={props.formFields.answers.option1.title? props.formFields.answers.option1.title:""} onChange={props.handleChangeAnswers} />
                <label htmlFor="option2" className="sr-only">Option2</label>
                <input type="text" name="option2" id="1" className="option" placeholder="No" value={props.formFields.answers.option2.title?props.formFields.answers.option2.title:""} onChange={props.handleChangeAnswers} />
                <button type='submit'>Create Poll</button>
            </form>
            <button onClick={props.addOptions}>Add more options</button>
            <button onClick={() => { props.setPreview(!props.preview) }} input={props.formFields}>Preview Poll</button>
        </section>
    )
}

export default CreatePollForm;