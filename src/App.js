import "./App.scss";
import firebase from "./firebase";
import Header from "./Header";
import Footer from "./Footer";
import CreatePoll from './CreatePoll';
import SharePoll from './SharePoll';
import VotePoll from "./VotePoll";
import Results from "./Results";
import PollBooths from "./PollBooths";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App container">
        <Header />
        <main className="wrapper">
          <Route exact path="/" render={() => <CreatePoll firebase={firebase} />} />
          <Route path="/sharepoll/:uniqueKey" component={SharePoll} />
          <Route path="/votepoll/:uniqueKey" component={VotePoll} />
          <Route path="/results/:uniqueKey" component={Results} />
          <Route path="/pollbooths" component={PollBooths} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
