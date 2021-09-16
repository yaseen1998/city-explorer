import Locationdata from "./components/Locationdata";
import Weatherdata from "./components/Weatherdata";
import SearchForm from "./components/SearchForm";
import Moviedata from "./components/Moviedata"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
      cityName: "",
      locationData: [],
      locationdisplay: true,
      weatherData: [],
      weatherdisplay: true,
      movieData: [],
      moviedisplay: true,
    };
  }
  handleLocation = (e) => {
    let city_name = e.target.value;
    this.setState({
      cityName: city_name,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // start call API
      let originalName = this.state.cityName;
      let location = await axios.get(
        `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${originalName}&format=json `
      );
      //######################
      let lat = location.data[0].lat;
      let lon = location.data[0].lon;
      let weather = await axios.get(
        `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${lon}`
      );
      //######################
      let movie = await axios.get(
        `${process.env.REACT_APP_API_URL}/movie?query=${originalName}`
      );
      // end call API
      // start store API data
      this.setState({
        locationData: location.data[0],
        errorMsg: "",
        weatherData: weather.data.foreCast,
        movieData: movie.data,
        displayLocation: false,
      });
      //end store API data
    } catch (error) {
      //start catch error
      this.setState({
        errorMsg: error.message,
        // displayLocation: false,
        // showWeather: false,
        // showMovie: false,
        movieData: error.response,
      });
    }
  };
  render() {
    return (
      <div>
        <SearchForm
          handleLocation={this.handleLocation}
          handleSubmit={this.handleSubmit}
        />
        <Locationdata location={this.state.locationData}/>
        <Weatherdata weather={this.state.weatherData}/>
        <Moviedata movie={this.state.movieData}/>
      </div>
    );
  }
}
export default App;
