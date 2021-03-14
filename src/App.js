import "./App.scss";
import firebase from "./firebase";
import Header from "./Header";
import Footer from "./Footer";
import CreatePoll from './CreatePoll';
import SharePoll from './SharePoll';
import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VotePoll from "./VotePoll";
import Results from "./Results";

function App() {

  const [formFields, setFormFields] = useState({title: '', question: '', Yes: 0, No: 0});

  return (
    <Router>
      <div className="App container">
        <Header />
        <main className="wrapper">
          <Route exact path="/" render= {() => <CreatePoll formFields={formFields} setFormFields={setFormFields} /> } />
          <Route path="/sharepoll/:uniqueKey" component={SharePoll} />
          <Route path="/votepoll/:uniqueKey" component={VotePoll} />
          <Route path="/results/:uniqueKey" component={Results} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
