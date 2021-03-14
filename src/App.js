import "./App.scss";
import firebase from "./firebase";
import Header from "./Header";
import Footer from "./Footer";
import CreatePoll from './CreatePoll';
import SharePoll from './SharePoll';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import VotePoll from "./VotePoll";

// Pseudo Code
// 1. Create Poll Component
// A form - input boxes to get a question & options(yes / no) 
// when creator click submit button -> store the info to firebase and retrieve unique key from firebase entry
//                  : onChange()- useState to store data which is from input boxes 
//                  : firebase.js -> access to firebase
//                  : onSubmit() - store data from useState to firebase
//                  : useEffect ( on("value") -> so we can get unikey key from firebase right away to generate unique url)
//                  : url +  uniquekey ie. poll.app/[uniquekey from firebase] -> creator will share this to voters
//
// 2. Voting Component
// users go to a poll booth with url + uniquekey
// display polling booth by
//        : grab uniquekey from the url 
//        : search the poll and call values by the uniquekey - ref(uniquekey).child("question)/.child(options)
//        : display polling booth form (yes or no radiobutton) - with the data from firebase
//        : user select one of the options (yes or no) , submit (answer required) -> the app retrieves current voting number and add one and save it (yes++ or no++)
//        
// 3. Tracking Component
// creator and voters can see the result of the poll
//            firebase data structure
//               -eifweoifhowiefhweof--wdw (polling booth)
//                  - question
//                  - options
//                      - yes : 0
//                      - no : 0
//                      - stretched goal options : 0
//                  - number of voters : 0
//        : when creator or users click result button ->  display total number of voters / yes/no numbers
// 4. others : Nav, Footer

function App() {

  const [pollsArray, setPollsArray] = useState([]);

  const [formFields, setFormFields] = useState({title: '', question: '', Yes: 0, No: 0});

  

  // useEffect(() => {

  //   const dbRef = firebase.database().ref('polls');

  //   dbRef.on('value', (data) => {

  //     const pollData = data.val();

  //     const polls = [];

  //     for (let pollKey in pollData) {
  //       polls.push({
  //         uniqueKey: pollKey,
  //         title: pollData[pollKey]
  //       });
  //     }

  //     setPollsArray(polls);

  //   })

  // }, [])
  

  return (
    <Router>
      <div className="App container">
        <Header />
        <main className="wrapper">
          <Route exact path="/" render= {() => <CreatePoll formFields={formFields} setFormFields={setFormFields} /> } />
          <Route path="/sharepoll/:uniqueKey" component={SharePoll} />
          <Route path="/votepoll/:uniqueKey" component={VotePoll} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
