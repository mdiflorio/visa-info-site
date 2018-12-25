export function getVisaRestrictionColor(visaRestriction) {
  switch (visaRestriction) {
    case "Freedom of movement":
      return "#0074D9"; // Blue
    case "Visa not required":
      return "#2ECC40"; // Green
    case "Visa required":
      return "#FF4136"; // Red
    case "eVisa":
    case "Visa on arrival":
    case "eVisa / Visa on arrival":
    case "Visitor's Permit on arrival":
    case "Electronic Entry Visa":
      return "#FF851B"; // Yellow
    default:
      return "#001f3f"; // Navy
  }
}
