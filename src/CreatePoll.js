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

    const [ options, setOptions ] = useState([]);

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
        const optionNumber = answers.length;
        const newOption = {}
        newOption.option3 = { title: '', votes: 0}

        setFormFields({
            ...formFields,
            answers: {
                ...formFields.answers,
                option3: {
                    title: '',
                    votes: 0
                }
            }
        });
        // answers.push(newOption)
        console.log(answers);
        // const newOptions = options + 1;
        // setOptions(newOptions);
    }

    return (
        <section className="poll">
            <h1>Create A Poll</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="sr-only">Poll Title</label>
                <input name="title" id="title" type="text" placeholder="Poll Title" onChange={handleChange} value={formFields.title} required />
                <label htmlFor="question" className="sr-only">Question</label>
                <input name="question" id="question" type="text" placeholder="Question" onChange={handleChange} value={formFields.question} required />
                <label htmlFor="option1" className="sr-only">Option1</label>
                <input type="text" name="option1" id="option1" className="option" placeholder="Yes" value={formFields.answers.option1.title?formFields.answers.option1.title:""} onChange={handleChangeAnswers} />
                <label htmlFor="option1" className="sr-only">Option2</label>
                <input type="text" name="option2" id="option1" className="option" placeholder="No" value={formFields.answers.option2.title?formFields.answers.option2.title:""} onChange={handleChangeAnswers} />
                <button type='submit'>Create Poll</button>
            </form>
            <button onClick={addOptions}>Add more options</button>
        </section>
    )
}

export default CreatePoll;