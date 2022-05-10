/**
 * Function for returning a string when the user is not authorized
 * @param req - request object
 * @returns - string to be returned to user when not authorized (invalid credentials or no credentials provided)
 */
export const getUnauthorizedResponse = (req: any): string => {
  return req.auth
    ? "Credentials did not match, and were rejected"
    : "No credentials provided";
};

/*
 * Tests to see if string is in correct UK style postcode: AL1 1AB, BM1 5YZ etc.
 * @param p - postcode to be tested
 * @returns - true if postcode is in correct format, false otherwise
 */
export const isValidPostcode = (p: string) => {
  if (!p || p.length < 3) {
    return false;
  }
  var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
  return postcodeRegEx.test(p);
};
