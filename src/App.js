import React, { Component } from "react";
import "./app.scss";
import DropDownMenu from "./components/DropDownMenu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="ui text container">
          <h2>Visa Requirements</h2>
          <div class="subheader">
            Select a nationality, then choose a country to view the countries
            visa requirements for that nationality.
          </div>
          <br />
          <DropDownMenu type="nationality" disabled={false} />
          <br />
          <DropDownMenu type="country" disabled={true} />
        </div>
      </div>
    );
  }
}

export default App;
