import React, { Component } from 'react';
import Location from './components/Location';
import SearchForm from './components/SearchForm';
import axios from 'axios';

export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      city_name:"",
      lat:"",
      lon:"",
      showData:false
    }
  }
  handleLocation=(e)=>{
    let city_name=e.target.value;
    this.setState({
      city_name:city_name
    })
  }
  handleSubmit=(e)=>{
    console.log(`${process.env.REACT_APP_LOCATIONIQ_API_KEY}`);
    e.preventDefault();
    let config={
      method:"GET",
      baseURL:`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city_name}&format=json`
      
    }
    axios(config).then(res=>{
      let responseData=res.data[0]
      console.log(responseData);
      this.setState({
        city_name:responseData.display_name,
        lon:responseData.lon,
        lat:responseData.lat,
        showData:true

      })
    })
  }
  render() {
    return (
      <div>
        <h1>Welcome to City explorer</h1>
        <SearchForm handleLocation={this.handleLocation} handleSubmit={this.handleSubmit}/>
        {
          this.state.showData&&
          <Location city_name={this.state.city_name}
                    type={this.state.type}
                    lat={this.state.lat}
                    lon={this.state.lon}
          />
        }
        
      </div>
    )
  }
}

export default App