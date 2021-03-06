import React, { Component } from "react";
import Location from "./components/Location";
import SearchForm from "./components/SearchForm";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/first.css";
import { Alert } from "react-bootstrap";
import Weather from "./components/Weather";
import Movie from "./components/Movie";


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_name: "",
      lat: "",
      lon: "",
      lat_lon: "",
      map: "",
      showData: false,
      iframe: "",
      error: "",
      errorhandle: false,
      weather: [],
      name_weather: [],
      err: "",
      overview: [],
      originalname: "",
    };
  }
  handleLocation = (e) => {
    let city_name = e.target.value;
    this.setState({
      city_name: city_name,
      
    });
  };
  handleSubmit = async(e) => {
    e.preventDefault();
    this.setState({
      originalname: this.state.city_name,
    })
    let config = {
      method: "GET",
      baseURL: `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city_name}&format=json `,
    };

    axios(config)
      .then((res) => {
        let responseData = res.data[0];
        this.setState({
          city_name: responseData.display_name,
          lon: responseData.lon,
          lat: responseData.lat,
          lat_lon: `${responseData.lat.toString()},${responseData.lon.toString()}`,
          showData: true,
          iframe: "iframe",
          errorhandle: false,
          errorhand: false,
        });
      })
      .catch((e) => {
        this.setState({ error: e.toString(), errorhandle: true });
      })
      .then(() =>
        axios.get(`${process.env.REACT_APP_API_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}`
          
        )
      )
      .then((res) => {
        this.setState({
          weather: res.data.foreCast,
          name_weather: res.data.city_name,
        });
      })
      .catch((e) => {
        this.setState({ err: e.toString(), errorhand: true });
      })
      .then(() =>
        axios.get(
          `${process.env.REACT_APP_API_URL}/movie?query=${this.state.originalname}`
        )
      )
      .then((res) => {
        this.setState({
          overview: res.data,
        });
      });
  };
  // catch(e=>{this.setState({error:e.toString(),errorhandle:true})})
  render() {
    return (
      <div>
        <h1>Welcome to City explorer</h1>
        <SearchForm
          handleLocation={this.handleLocation}
          handleSubmit={this.handleSubmit}
        />
        {this.state.showData && this.state.errorhandle === false && (
          <Location

          city_name={this.state.city_name}
            type={this.state.type}
            lat={this.state.lat}
            lon={this.state.lon}
            map={this.state.map}
            iframe={this.state.iframe}
            img={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&zoom=1-18
                    &center=${this.state.lat_lon}`}
          />
        )}
        {this.state.errorhand === false && (
          <Weather
            forcast={this.state.weather}
            name={this.state.name_weather}
          />
        )}

        <Movie movielist={this.state.overview}/>
        

        {this.state.errorhandle && (
          <Alert variant="dark">{this.state.error}</Alert>
        )}

        {this.state.errorhand && <Alert variant="dark">{this.state.err}</Alert>}
      </div>
    );
  }
}

export default App;
