import express, { Request, Response, NextFunction } from "express";
import fetch, { RequestInit } from "node-fetch";
import WeatherGetRequest from "../../types/WeatherGetRequest";
import { Data, RootObject } from "../../types/WeatherResponse";
import { isValidPostcode } from "../../utils";
import { validationResult } from "express-validator";
import { insertOrUpdateIntoDb } from "../../database/utils";
import moment from "moment";
const db = require("../../database/db");

let router = express.Router();
const FORMAT: string = "json";
const dateFormat: string = "YYYY-MM-DD";

router.get(
  "/",
  async function (req: Request<WeatherGetRequest>, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { query } = req; // gets query from request

    if (!query || !Object.entries(query).length) {
      //if no query or query has no entries
      return res
        .status(400)
        .json({ error: true, message: "No query data provided" }); //return error
    }

    //drop table weather_data if it exists
    const start_date: string = query.start_date as string;
    const end_date: string = query.end_date as string;
    const postcode: string | undefined = query.postcode as string;

    //format into standard unix timestamp
    const startDateMoment = moment(start_date, dateFormat);
    const endDateMoment = moment(end_date, dateFormat);
    const startDate = startDateMoment.unix();
    const endDate = moment(end_date, dateFormat).unix();

    //get number of days between start and end date
    //there is not end_date in the worldweatheronline api so we have to use the start_date and calc the number of days between start and end date
    const num_of_days = endDateMoment.diff(startDateMoment, "days");

    if (!isValidPostcode(postcode)) {
      //if postcode is not valid
      return res.status(400).json({ error: true, message: "Invalid postcode" }); //return error
    }

    //first, check if the weather data is in the database
    const databaseData = await db("weather_data")
      .where("postcode", postcode)
      .whereBetween("date", [startDate, endDate])
      .select()
      .catch((err: any) => {
        //if error
        console.log(err);
      });

    if (databaseData?.length) {
      //we need to check here if we actually have all the data in the db
      if (num_of_days === databaseData?.length - 1) {
        //if we have all the data
        //otherwise we'll need to call the API to download the missing data
        console.log("fetching from db");
        return res.status(200).json({ weather: databaseData });
      }
    }

    const key: string | undefined = process.env.WORLD_WEATHER_ONLINE_API_KEY; //gets api key from env

    if (!key) {
      // if key is not defined, return error
      return res.status(500).json({
        error: true,
        message: "No worldweatheronline.com API key found",
      });
    }

    if (!postcode) {
      //if postcode is not defined, return error
      return res.status(400).json({
        error: true,
        message: "No postcode provided",
      });
    }

    var requestOptions: RequestInit = {
      // Request options
      method: "GET",
      redirect: "follow",
    };

    //connect to the HISTORICAL API
    const url = `https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${postcode}&enddate=${endDateMoment.format(
      dateFormat
    )}&date=${startDateMoment.format(
      dateFormat
    )}&key=${key}&format=${FORMAT}&includelocation=yes`;

    console.debug("Fetching from worldweatheronline.com", url);

    fetch(
      //fetches data from worldweatheronline api. TODO move this to a separate file
      url,
      requestOptions
    )
      .then((response) => response.json())
      .then((result: RootObject) => {
        const data: Data = result.data;
        //inserts data into db; iterates through the data and inserts it one by one into the db
        data.weather?.forEach(async (weather) => {
          const date = moment(weather.date, dateFormat).unix(); //format date into unix
          weather.date = date; //get date unix timestamp from moment
          delete weather.astronomy; //delete astronomy, we dont need to store this data as we dont use it
          delete weather.hourly; //same here
          weather.location = data?.nearest_area?.[0]?.areaName?.[0]
            .value as string; //get location from nearest_area
          weather.postcode = postcode; //add postcode to weather object
          await insertOrUpdateIntoDb(weather, db); //TODO improve by using a bulk insert
        });
        res.json({ weather: data?.weather } || { weather: [] }); //return data
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
);

module.exports = router;
