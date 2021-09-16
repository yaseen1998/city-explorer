import React, { Component } from "react";
import { Row, Card, Col } from "react-bootstrap";

export class Weatherdata extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  checkdescription = (description, date, index) => {
let imgurl
switch(description) {
    case "Few clouds":
      
      imgurl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Weather-few-clouds.svg/240px-Weather-few-clouds.svg.png"
      break;
    case 'Clear Sky':
      // code block
      imgurl =  "https://www.clipartmax.com/png/middle/66-662992_weather-clear-sky-weather-symbol.png"
      break;
      case 'Scattered clouds':
      imgurl =  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8UgWE2Iqqmlp-EwmxLxF2OHG0iP5zRIGDJQ&usqp=CAU"
      break;
      case 'Broken clouds':
        imgurl =  "https://cdn.hikb.at/img/weather/icons/803.png"
        break; 
        case 'Overcast clouds':
            imgurl =  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Weather-overcast.svg/2048px-Weather-overcast.svg.png"
            break; 
        case 'Heavy rain':
            imgurl =  "https://www.nicepng.com/png/detail/328-3287379_open-heavy-rain-weather-symbol.png"
            break; 
        case 'Light shower rain':
            imgurl =  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxeUZB7gJj_7JlPGbN4spztfKtF4Ec0hY_GA&usqp=CAU"
            break; 
        case 'Light rain':
            imgurl =  "https://w7.pngwing.com/pngs/808/125/png-transparent-weather-forecasting-severe-weather-rain-storm-light-rain-text-weather-forecasting-logo-thumbnail.png"
            break; 
    default:
      imgurl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqhImnN1KCxe8k8DDt0pCl01uqmq6yZDPm3w&usqp=CAU'
  }
    return (
      <Col key={index}>
        <Card
          style={{
            width: "380px",
            height: "400px",
            overflow: "scroll",
            border: "solid black 4px",
          }}
        >
          <Card.Img
            variant="top"
            src={imgurl}
            style={{ width: "300px", marginLeft: "40px", height: "200px" }}
            alt="no Image source"
          />
          <Card.Body>
            <Card.Title>date: {date}</Card.Title>
            <Card.Text><strong>description: {description}</strong></Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  render() {
    return (
      <div>
          <div>
        {/* <h1> {this.props.weather.city_name}</h1><br/><hr/> */}
        <Row xs={1} md={3} className="g-4">
        {this.props.weather.map((item, idx) =>
            this.checkdescription(item.description, item.date, idx)
          )}
        </Row>
      </div><br/><hr/>
      </div>
    );
  }
}

export default Weatherdata;