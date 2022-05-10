import styled from "styled-components";

var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const getShortDay = (epoch:number) => {
  var date = new Date(epoch * 1000);
  return days[ date.getDay() ];
}

export default function WeatherItem(props:any) {
  return (
    <Item {...props} onClick={props.onClick}>
      <ItemName>{getShortDay(props.weather.date)}</ItemName>
      <ItemTemp>{props.weather.avgtempC}°c</ItemTemp>
  </Item>
  )
}

interface Props {
  active?: boolean | undefined;
}

const Item = styled.li<Props>`
  ${(props:any)=> props.active ? `background: #fff;
  color: #222831;
  border-radius: 10px;`: ''}
  float: left;
  padding: 15px;
  cursor: pointer;
  transition: 200ms ease;
  border-radius: 10px;
  &:hover {
      transform: scale(1.1);
      background: #fff;
      color: #222831;
      box-shadow: 0 0 40px -5px rgb(0 0 0 / 20%);
    }
  }
`

const ItemName = styled.span`
  display: block;
  margin: 10px 0 0 0;
  text-align: center;
`

const ItemTemp = styled.span`
  display: block;
  text-align: center;
  margin: 10px 0 0 0;
  font-weight: 700;
`
