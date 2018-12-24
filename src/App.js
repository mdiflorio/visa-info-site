import React, { Component } from "react";
import "./app.scss";
import DropDownMenu from "./components/DropDownMenu";
import Button from "./components/Button";
import * as Api from "./modules/api";

import nationalityList from "./assets/nationalityList";
import { getCountryCode } from "./assets/countryCodes";

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
      countriesList: [],
      loadingCountriesList: false
    };
  }

  handleNationalityChange = (e, { value }) => {
    this.setState({
      nationality: value,
      countryData: [],
      countriesList: [],
      loadingCountriesList: true
    });
    Api.fetchListOfCountries(value).then(countriesData => {
      let countriesList = [];
      for (let i in countriesData) {
        const flag = getCountryCode(countriesData[i].country);

        countriesList.push({
          key: i + countriesData[i].country,
          value: i,
          flag,
          text: countriesData[i].country
        });
      }
      this.setState({
        countriesData,
        countriesList,
        loadingCountriesList: false
      });
    });
  };

  handleCountryChange = (e, { value }) => this.setState({ country: value });

  render() {
    const { nationalities, countriesList, loadingCountriesList } = this.state;
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
          <br />
          <div className="btnContainer">
            <Button text="Submit" />
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default App;
