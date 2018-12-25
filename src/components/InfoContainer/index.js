import React from "react";
import "./index.scss";
import { Segment } from "semantic-ui-react";
import { getVisaRestrictionColor } from "../../helpers/getVisaRestrictionColor";

const InfoContainer = ({ data }) => {
  const { info } = data;
  const circleColor = getVisaRestrictionColor(info.visatype);
  return (
    <Segment>
      <div>
        <div className="visaTypeContainer">
          <div className="circle-container">
            <div className="circle" style={{ backgroundColor: circleColor }} />
            <h3>{info.visatype}</h3>
            <br />
          </div>
        </div>
        {info.duration !== "" && (
          <div>
            <h3>Duration</h3>
            <p>{info.duration}</p>
          </div>
        )}

        {info.note !== "" && (
          <div>
            <h3>Note:</h3>
            <p>{info.note}</p>
          </div>
        )}
      </div>
    </Segment>
  );
};

export default InfoContainer;
