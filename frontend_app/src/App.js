import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SWC_Info from "./components/SWC_Info.js";
import SWC_List from "./components/SWC_List.js";

class App extends Component {
  constructor() {
    super();
    this.state = { selectedId: "1" };
  }

  myClick = (id) => {
    console.log("hi... " + id);
    this.setState({ selectedId: id });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h2>STAR WARS</h2>
          </header>
          <div className="App-main">
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <SWC_List myClick={this.myClick} />
                </React.Fragment>
              )}
            />
            <Route
              path="/info"
              render={(props) => <SWC_Info id={this.state.selectedId} />}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
