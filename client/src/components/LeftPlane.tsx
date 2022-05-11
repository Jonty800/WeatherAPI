import styled from "styled-components";
import { Weather } from "../types/WeatherResponse";
import moment from "moment";

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getLongDay = (epoch: number) => {
  var date = new Date(epoch * 1000);
  return days[date.getDay()];
}; 

const getDateString = (epoch: number) => {
  return moment(epoch * 1000).format("MMM Do");
};

export default function LeftPlane(props: any) {
  const weather: Weather = props.weather; //weather data
  const location = weather?.location; ///location data
  return !weather ? (
    <DayName>No weather found...</DayName>
  ) : (
    <>
      <DateContainer>
        <DayName>{getLongDay(weather?.date)}</DayName>
        <DateText>{getDateString(weather?.date)}</DateText>
        <DateText>{location || ""}</DateText>
      </DateContainer>
      <WeatherContainer>
        <TempText>{weather?.avgtempC}°c</TempText>
      </WeatherContainer>
    </>
  );
}

//styles
const TempText = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 4em;
  color: white;
  float: left;
`;

const WeatherContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
`;

const DateContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 25px;
  left: 25px;
`;

const DayName = styled.h2`
  margin: 0;
`;

const DateText = styled.span`
  margin: 0;
  float: left;
  margin-bottom: 6px;
`;
