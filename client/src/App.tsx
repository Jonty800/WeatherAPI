import "./App.css";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import api from "./api";
import { Weather } from "./types/weather-response";
import WeatherItem from "./components/WeatherItem";
import LeftPlane from "./components/LeftPlane";

function App() {
  const [weather, setWeather] = useState<Weather[]>([]);
  const [postcode, setPostcode] = useState<string>("BS15 3FW");
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedWeather, setSelectedWeather] = useState<Weather | undefined>();

  /**
   * Fetch weather data for the postcode state
   */
  const getWeather = useCallback(() => {
    api
      .getWeatherByPostcode(postcode)
      .then((data: any) => {
        setWeather(data?.weather);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postcode]); //only update when postcode changes

  useEffect(() => {
    getWeather();
  }, []); //when this array is empty, the effect will only run once (upon component mount)

  useEffect(() => {
    if (weather && weather?.length) {
      setSelectedWeather(weather?.[0]);
    }
  }, [weather]); //only called when weather changes

  const onKeyUp = (e: any) => {
    //when the user presses enter, trigger a new API call
    if (e.key === "Enter") {
      // Cancel the default action, if needed
      getWeather();
      setEditing(false);
      setSelectedWeather(undefined);
      e.preventDefault();
    }
  };

  const onChange = (e: any) => {
    //when the input changes
    setPostcode(e.target.value);
  };

  const onButtonClick = () => {
    //when the button is clicked
    setEditing(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <LeftPannel>
            <LeftPannelOverlay />
            <LeftPlane weather={selectedWeather} postcode={postcode} />
          </LeftPannel>
          <RightPanel>
            <div
              style={{
                marginLeft: "36px",
                marginRight: "36px",
              }}
            ></div>
            <WeekList>
              {weather?.map((weather: Weather, index: number) => {
                const onClick = () => {
                  setSelectedWeather(weather);
                };
                return (
                  <WeatherItem
                    key={index}
                    weather={weather}
                    active={weather.date === selectedWeather?.date}
                    onClick={onClick}
                  />
                );
              })}
            </WeekList>
            {editing ? (
              <Input
                name="input"
                value={postcode}
                onKeyUp={onKeyUp}
                onChange={onChange}
              ></Input>
            ) : (
              <Button onClick={onButtonClick}>Change Location</Button>
            )}
          </RightPanel>
        </Container>
      </header>
    </div>
  );
}

//styles
const LeftPannelOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
  border-radius: 25px;
  opacity: 0.8;
`;

const LeftPannel = styled.div`
  position: relative;
  height: 400px;
  border-radius: 25px;
  background-image: url(https://images.unsplash.com/photo-1520520731457-9283dd14aa66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80);
  width: 300px;
  box-shadow: 0 0 20px -10px rgb(0 0 0 / 20%);
  float: left;
`;

const RightPanel = styled.div`
  position: relative;
  float: left;
  height: 400px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;

const Button = styled.button`
  outline: none;
  width: 200px;
  box-sizing: border-box;
  border: none;
  border-radius: 25px;
  padding: 10px;
  margin-left: 16px;
  margin-right: 16px;
  background-image: linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%);
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 0 30px -5px rgb(0 0 0 / 25%);
  cursor: pointer;
  align-self: center;
  transition: transform 200ms ease;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 40px -5px rgb(0 0 0 / 20%);
  }
}`;

const Input = styled.input`
  outline: none;
  width: 200px;
  box-sizing: border-box;
  border: none;
  border-radius: 25px;
  padding: 10px;
  margin-left: 16px;
  margin-right: 16px;
  background-image: linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%);
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 0 30px -5px rgb(0 0 0 / 25%);
  cursor: pointer;
  align-self: center;
}`;

const Container = styled.div`
  display: flex;
  background-color: #222831;
  border-radius: 25px;
  font-family: "Montserrat", sans-serif;
`;

const WeekList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 35px;
  box-shadow: 0 0 50px -5px rgb(0 0 0 / 25%);
  border-radius: 10px;
`;

// const InfoLabel = styled.div`
//   margin: 0 0 10px 0;
//   font-weight: 700;
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
// `;

export default App;
