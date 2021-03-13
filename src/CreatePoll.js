import firebase from 'firebase';

function CreatePoll(props) {

    const {formFields, setFormFields} = props;

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const dbRef = firebase.database().ref('polls');
    
        const firebaseReturn = dbRef.push(formFields);
    
        const pollKey = firebaseReturn.key;

        setFormFields({...formFields, uniqueKey: [pollKey]});

        console.log(formFields);
    
        // // console.log(pollKey);

        // window.location.replace('/sharepoll');
    
        // setPollsArray([]);
    }

    const handleChange = (e) => {

        setFormFields({...formFields, [e.target.name]: e.target.value});

    }

    return (
        <section className="create-poll">
            <h1>Create A Poll</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="sr-only">Poll Title</label>
                <input name="title" id="title" type="text" placeholder="Poll Title" onChange={handleChange} value={formFields.title} />
                <label htmlFor="question" className="sr-only">Question</label>
                <input name="question" id="question" type="text" placeholder="Question" onChange={handleChange} value={formFields.question} />
                <label htmlFor="option1" className="sr-only">Option1</label>
                <input type="text" name="option1" id="option1" className="option" placeholder="Yes" value="Yes" disabled />
                <label htmlFor="option2" className="sr-only">Option1</label>
                <input type="text" name="option2" id="option2" className="option" placeholder="No" value="No" disabled />
                <button>Create Poll</button>
            </form>
        </section>
    )
}

export default CreatePoll;