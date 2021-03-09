import "./App.css";
import Logo from "./img/logo.png";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SWCInfo from "./components/SWCInfo.js";
import SWCList from "./components/SWCList.js";

class App extends Component {
  // the constructor function
  constructor() {
    super();
    this.state = { selectedId: "1" };
  }

  // This function is getting the Id of the selected person from SWC_List component and set the state up on that id
  myClick = (id) => {
    this.setState({ selectedId: id });
  };

  /*  This function is rendering the main App component which consists of (App-header & App-main).
  App-main will be rendered in two ways depending on the selected route .
  The path "/" is combined with SWC_List component, whereas
  the path "/info" is combined with SWC_Info component   */
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={Logo} alt={"logo"} className=""></img>
          </header>
          <div className="App-main">
            <Route
              exact
              path="/"
              render={(props) => <SWCList myClick={this.myClick} />}
            />
            <Route
              path="/info"
              render={(props) => <SWCInfo id={this.state.selectedId} />}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
