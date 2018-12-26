import React, { Component } from "react";
import "./app.scss";
import DropDownMenu from "./components/DropDownMenu";
import Button from "./components/Button";
import * as Api from "./modules/api";

import nationalityList from "./assets/nationalityList";
import { getCountryCode } from "./helpers/countryCodes";
import InfoContainer from "./components/InfoContainer";
import { Loader } from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();

    let nationalities = [];
    // Format nationality list for dropdown
    nationalityList.forEach(nationality => {
      nationalities.push({
        key: nationality,
        value: nationality,
        text: nationality
      });
    });

    this.state = {
      inputs: {
        nationality: "",
        country: ""
      },
      nationalities,
      countries: {
        info: [],
        names: []
      },
      selected: {
        info: null
      },
      loading: {
        infoContainer: false,
        countriesList: false
      }
    };
  }

  handleNationalityChange = (e, { value }) => {
    // Set loading and reset old values.
    this.setState({
      nationality: value,
      countries: {
        info: [],
        names: []
      },
      loading: {
        ...this.state.loading,
        countriesList: true
      }
    });

    // Fetch from API.
    Api.fetchListOfCountries(value).then(info => {
      let countryNames = [];

      // Organise data for dropdown.
      for (let i in info) {
        const flag = getCountryCode(info[i].country);
        countryNames.push({
          key: i + info[i].country,
          value: i,
          flag,
          text: info[i].country
        });
      }

      // Update state and stop loading
      this.setState({
        countries: {
          info,
          names: countryNames
        },
        loading: {
          ...this.state.loading,
          countriesList: false
        }
      });
    });
  };

  handleCountryChange = (e, { value }) =>
    this.setState({ inputs: { ...this.state.inputs, country: value } });

  handleSubmit = () => {
    const { loading, countries, inputs } = this.state;
    // Show loading.
    this.setState({
      loading: {
        ...loading,
        infoContainer: true
      },
      selected: {
        info: null
      }
    });

    const selected = {
      info: countries.info[inputs.country]
    };
    console.log(inputs);

    setTimeout(() => {
      this.setState({
        selected,
        loading: {
          ...this.state.loading,
          infoContainer: false
        }
      });
    }, 400);
  };

  render() {
    const { nationalities, countries, loading, selected } = this.state;
    return (
      <div className="App">
        <div className="container">
          <h2>Visa Requirements</h2>
          <div className="subheader">
            Select a nationality, then choose a country to view the country's
            visa requirements for that nationality.
          </div>
          <h3>Nationality</h3>
          <DropDownMenu
            type="nationality"
            handleChange={this.handleNationalityChange}
            data={nationalities}
            loading={false}
          />
          <h3>Country</h3>
          <DropDownMenu
            type="country"
            handleChange={this.handleCountryChange}
            data={countries.names}
            loading={loading.countriesList}
          />
          <br />
          <div className="btnContainer">
            <Button text="Submit" onClick={this.handleSubmit} />
          </div>
          <br />

          {loading.infoContainer && (
            <div className="center">
              <Loader inline active>
                Loading
              </Loader>
            </div>
          )}
          {selected.info && <InfoContainer data={selected} />}
        </div>
      </div>
    );
  }
}

export default App;
