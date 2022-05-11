# WeatherAPI
Example WeatherAPI backend and frontend app using Typescript, NodeJS, ReactJS and MySQL

First things first, place `.env` file inside of `/api folder`. Here you will need:

```
WORLD_WEATHER_ONLINE_API_KEY= //your api key goes here
BASIC_AUTH_USERNAME= //your choice of username
BASIC_AUTH_PASSWORD= //your choice of password
```

The frontend and backend can be run, using docker-compose:

- `docker-compose build`
- `docker-compose up`


The frontend runs default port `3000`
The backend runs on port `9000`

## The API also has some test cases (jest, supertest), which can be ran using:
```
cd api
npm run test
```
