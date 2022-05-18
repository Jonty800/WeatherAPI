/**
 * Gets the weather data from the API.
 * TODO support changing of static dates
 * TODO correct API URL beyond localhost
 * @param postcode The postcode of the user
 * @returns The weather data
 */
export default function getWeatherByPostcode(postcode: string) {
  console.log(`Getting weather for postcode ${postcode}`);
  return new Promise((resolve, reject) => {
    if (!postcode) {
      throw new Error("Postcode is required"); //throw error if postcode is not provided
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic aG9tZUxJTks6aGlyZSRKb24xMjM="); //TODO get this from env

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:9000/v1/weather?postcode=${postcode}&start_date=2022-04-05&end_date=2022-04-09`, //TODO get this from env
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        resolve(result); //returns the weather data in the promise
      })
      .catch((error) => {
        console.log("error", error);
        reject(error); //returns the error in the promise
      });
  });
}
