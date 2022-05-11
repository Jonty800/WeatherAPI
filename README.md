# WeatherAPI
Example WeatherAPI backend and frontend app using Typescript, NodeJS, ReactJS and MySQL

<img src="https://i.imgur.com/BK3V4xc.png" alt="widget" width="600"/>

-------

## Setup 
First things first, place `.env` file inside of `/api folder`. Here you will need:

```
WORLD_WEATHER_ONLINE_API_KEY= //your api key goes here
BASIC_AUTH_USERNAME= //your choice of username
BASIC_AUTH_PASSWORD= //your choice of password
```

## Run

The frontend and backend can be run, using docker-compose. From the root directory call:

- `docker-compose build`
- `docker-compose up`


The frontend runs on default port `3000` and the backend runs on port `9000`

## Tests
```
cd api
npm run test
```
