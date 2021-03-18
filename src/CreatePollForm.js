//Component that renders create poll form for CreatePoll.js
function CreatePollForm(props) {

    //Check to see if inputs are empty
    const checkInputs = () => {
        if (props.formFields.title === "" || props.formFields.question === "") {
            return false;
        }

        let empty = true;
        for (const answer in props.formFields.answers) {
            if (props.formFields.answers[answer].title === "") {
                empty = true;
            } else {
                empty = false
            }
        }

        if (empty === true) {
            return false;
        } else {
            return true;
        }
    }

    //Checks to see if inputs are empty, if not show preview poll component
    const previewPoll = () => {
        if (checkInputs() === true) {
            props.setPreview(!props.preview)
        } else {
            alert("Please fill out form.");
        }
    }

    return (
        <section className="poll" id="main-content">
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
            <button onClick={previewPoll} input={props.formFields} >Preview Poll</button>

        </section>
    )
}

export default CreatePollForm;