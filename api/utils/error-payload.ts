const WorldWeatherError = {
  error: true,
  message: "No worldweatheronline.com API key found",
};

const OtherError = {
  error: true,
  message: "Something went wrong",
};

const NoPostcodeError = { error: true, message: "Invalid postcode" };
const NoQueryDataError = { error: true, message: "No query data provided" };
const DatabaseError = { error: true, message: "Database error" };

export default {
  NoPostcodeError,
  NoQueryDataError,
  WorldWeatherError,
  OtherError,
  DatabaseError,
};
