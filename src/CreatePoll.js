import firebase from 'firebase';
import { useState } from 'react';

function CreatePoll(props) {

    const { formFields, setFormFields } = props;
    const [ answerField, setAnswerField ] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const dbRef = firebase.database().ref('polls');

        const firebaseReturn = dbRef.push(formFields);

        const pollKey = firebaseReturn.key;

        dbRef.on('value', () => {
            window.location.replace(`/sharepoll/${pollKey}`);
        })
    }

    const handleChange = (e) => {

        setFormFields({ ...formFields, [e.target.name]: e.target.value });

    }


    const handleChangeAnswers = (e) => {


        formFields.answers[e.target.name] = { title: e.target.value };


        setFormFields({
            ...formFields,
            answers: [
                ...answers,
                {
                    title: e.target.value,
                    votes: 0
                }
            ]
        })

    }

    return (
        <section className="poll">
            <h1>Create A Poll</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="sr-only">Poll Title</label>
                <input name="title" id="title" type="text" placeholder="Poll Title" onChange={handleChange} value={formFields.title} required />
                <label htmlFor="question" className="sr-only">Question</label>
                <input name="question" id="question" type="text" placeholder="Question" onChange={handleChange} value={formFields.question} required />
                <label htmlFor="0" className="sr-only">Option1</label>
                <input type="text" name="0" id="0" className="option" placeholder="Yes" value={formFields.answers[0].title} onChange={handleChangeAnswers} />
                <label htmlFor="1" className="sr-only">Option2</label>
                <input type="text" name="1" id="1" className="option" placeholder="No" value={formFields.answers[1].title} onChange={handleChangeAnswers} />
                <button>Create Poll</button>
            </form>
        </section>
    )
}

export default CreatePoll;