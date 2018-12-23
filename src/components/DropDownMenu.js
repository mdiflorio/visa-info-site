import React from "react";
import { Dropdown } from "semantic-ui-react";

// import { countryOptions } from "../common";
const nationalityOptions = [
  { key: "af", value: "af", flag: "af", text: "Afghanistan" }
];

const countryOptions = [
  { key: "af", value: "af", flag: "af", text: "Afghanistan" }
];

const DropDownMenu = ({ type, disabled, loading }) => (
  <Dropdown
    placeholder={`Select ${type}`}
    fluid
    search
    selection
    options={type === "Nationality" ? nationalityOptions : countryOptions}
    disabled={disabled}
  />
);

export default DropDownMenu;
