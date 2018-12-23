import React, { Component } from "react";
import "./app.scss";
import DropDownMenu from "./components/DropDownMenu";
import * as Api from "./modules/api";

import nationalityList from "./assets/nationalityList";

class App extends Component {
  constructor() {
    super();

    let nationalities = [];

    nationalityList.forEach(nationality => {
      nationalities.push({
        key: nationality,
        value: nationality,
        text: nationality
      });
    });

    this.state = {
      nationality: "",
      country: "",
      nationalities,
      countriesData: [],
      countriesList: []
    };
  }

  handleNationalityChange = (e, { value }) => {
    this.setState({ nationality: value });
    Api.fetchListOfCountries(value).then(countriesData => {
      let countriesList = [];
      for (let i in countriesData) {
        countriesList.push({
          key: countriesData[i].country,
          value: countriesData[i].country,
          text: countriesData[i].country
        });
      }
      this.setState({ countriesData, countriesList });
    });
  };

  handleCountryChange = (e, { value }) => this.setState({ country: value });

  render() {
    const { nationalities, countriesList } = this.state;
    return (
      <div className="App">
        <div className="container">
          <h2>Visa Requirements</h2>
          <div className="subheader">
            Select a nationality, then choose a country to view the country's
            visa requirements for that nationality.
          </div>
          <br />
          <DropDownMenu
            type="nationality"
            handleChange={this.handleNationalityChange}
            data={nationalities}
          />
          <br />
          <DropDownMenu
            type="country"
            handleChange={this.handleCountryChange}
            data={countriesList}
          />
        </div>
      </div>
    );
  }
}

export default App;
