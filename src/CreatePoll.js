import firebase from 'firebase';
import { useState } from 'react';
import CreatePollForm from "./CreatePollForm";
import PreviewPoll from "./PreviewPoll";

function CreatePoll() {

    const [preview, setPreview] = useState(false);
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
        })
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
        <>
            {
                preview ? <PreviewPoll formFields={formFields} preview={preview} setPreview={setPreview} /> :
                    <CreatePollForm handleSubmit={handleSubmit} handleChange={handleChange} handleSubmit={handleSubmit} formFields={formFields} preview={preview} setPreview={setPreview} handleChangeAnswers={handleChangeAnswers} />
            }
        </>
    )
}

export default CreatePoll;