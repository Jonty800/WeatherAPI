# WeatherAPI
Example WeatherAPI backend and frontend app using Typescript, NodeJS, ReactJS and MySQL

The frontend and backend can be run on two separate ports, using 2 separate terminals.

## To run the frontend, use:
```
cd client
npm start
```

This runs the frontend on default port `3000`


## To run the backend, in a separate terminal use:
```
cd api
npm run dev
```

This runs the backend on port `9000`. Change this in your `.env` file.


place `.env` file inside of `/api folder`. Here you will need:

```
WORLD_WEATHER_ONLINE_API_KEY= //your api key goes here
BASIC_AUTH_USERNAME= //your choice of username
BASIC_AUTH_PASSWORD= //your choice of password
```

MySQL has to be installed onto your machine, and a database created called `"weather"`, with authentication `{user: "root", password: "password"}`. In future work, and in a deployable scenario, I would automate this.

## The API also has some test cases (jest, supertest), which can be ran using:
```
cd api
npm run test
```
