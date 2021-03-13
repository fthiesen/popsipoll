import "./App.scss";
import firebase from "./firebase";
import Header from "./Header";
import Footer from "./Footer";

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


  const handleSubmit = () => {

  }

  return (
    <div className="App container">
      <Header />
      <main className="wrapper">
        <section className="create-poll">
          <h1>Create A Poll</h1>
          <form>
              <label htmlFor="poll-title" className="sr-only">Poll Title</label>
              <input name="poll-title" id="poll-title" type="text" placeholder="Poll Title"/>
              <label htmlFor="poll-question" className="sr-only">Question</label>
              <input name="poll-question" id="poll-question" type="text" placeholder="Question"/>
              <label htmlFor="option1" className="sr-only">Option1</label>
              <input type="text" name="option1" id="option1" className="option" placeholder="Yes" value="Yes" disabled/>
              <label htmlFor="option2" className="sr-only">Option1</label>
              <input type="text" name="option2" id="option2" className="option" placeholder="No" value="No" disabled/>
            <button onSubmit={handleSubmit}>Create Poll</button>
          </form>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
