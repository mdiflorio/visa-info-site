import React from "react";
import { Dropdown } from "semantic-ui-react";

const DropDownMenu = ({ handleChange, type, data, loading }) => {
  return (
    <Dropdown
      placeholder={`Select ${type}`}
      fluid
      search
      selection
      onChange={handleChange}
      options={data}
      disabled={data.length === 0 ? true : false}
      loading={loading}
    />
  );
};

export default DropDownMenu;
