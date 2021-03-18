import { useState } from 'react';
import CreatePollForm from "./CreatePollForm";
import PreviewPoll from "./PreviewPoll";

//Component where creator creates a poll
function CreatePoll(props) {

    //Importing firebase from App.js
    const { firebase } = props;

    //Initialize state to preview poll and render PreviewPoll.js
    const [preview, setPreview] = useState(false);

    //Initialize state to store form input changes to store in database
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

    //Initialize state to store name of answer options
    const [answersNames, setAnswersNames] = useState(["option1", "option2"]);

    //Function to store user input to firebase and redirects user to SharePoll.js with key in url
    const handleSubmit = (e) => {
        e.preventDefault();

        const dbRef = firebase.database().ref("polls");
        const firebaseReturn = dbRef.push(formFields);

        const pollKey = firebaseReturn.key;

        dbRef.on('value', () => {
            window.location.replace(`/sharepoll/${pollKey}`);
        })
    }

    //Function to handle form changes
    const handleChange = (e) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
    }

    //Function to handle all answer option changes
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

    //Function to dynamically add new option inputs
    const addOptions = () => {
        const answers = Object.keys(formFields.answers);
        const newOption = `option${answers.length + 1}`;
        answers.push(newOption);
        setAnswersNames(answers);

        setFormFields({
            ...formFields,
            answers: {
                ...formFields.answers,
                [newOption]: {
                    title: '',
                    votes: 0
                }
            }
        })
    }

    return (
        <>
            {
                preview ? <PreviewPoll formFields={formFields} preview={preview} setPreview={setPreview} answersNames={answersNames}/>
                    :
                    <CreatePollForm handleSubmit={handleSubmit} handleChange={handleChange} formFields={formFields} preview={preview} setPreview={setPreview} handleChangeAnswers={handleChangeAnswers} addOptions={addOptions} options={answersNames} />
            }
        </>
    )
}

export default CreatePoll;