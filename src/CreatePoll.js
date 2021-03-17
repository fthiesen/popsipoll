import firebase from 'firebase';
import { useState } from 'react';

function CreatePoll() {

    const [formFields, setFormFields] = useState({
        title: '', question: '', answers: {
            option1: {
                title: '',
                votes: 0
            },
            option2: {
                title: '',
                votes: 0
            }
        }
    });

    const [ options, setOptions ] = useState(["option1", "option2"]);

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
        setFormFields({
            ...formFields,
            answers: {
                ...formFields.answers,
                [e.target.name]: {
                    title: e.target.value,
                    votes: 0
                }
            }
        });
    }

    const addOptions = () => {
        const answers = Object.keys(formFields.answers);
        const newOption = `option${answers.length + 1}`;
        answers.push(newOption);
        setOptions(answers);

        setFormFields({
            ...formFields,
            answers: {
                ...formFields.answers,
                [newOption]: {
                    title: '',
                    votes: 0
                }
            }
        });

        console.log(formFields);
        console.log(options);
    }

    return (
        <section className="poll">
            <h1>Create A Poll</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="sr-only">Poll Title</label>
                <input name="title" id="title" type="text" placeholder="Poll Title" onChange={handleChange} value={formFields.title} required />
                <label htmlFor="question" className="sr-only">Question</label>
                <input name="question" id="question" type="text" placeholder="Question" onChange={handleChange} value={formFields.question} required />
                {
                    options.map((answerName, index) => {
                        return (
                            <div key={index}>
                                <label htmlFor={answerName} className="sr-only">Option1</label>
                                <input type="text" name={answerName} id={answerName} className="option" placeholder="Type an answer option here" value={formFields.answers[answerName].title} onChange={handleChangeAnswers} />
                            </div>
                        )
                    })
                }
                <button type='submit'>Create Poll</button>
            </form>
            <button onClick={addOptions}>Add more options</button>
        </section>
    )
}

export default CreatePoll;