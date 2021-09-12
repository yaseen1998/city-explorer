import React, { Component } from 'react';
import Location from './components/Location';
import SearchForm from './components/SearchForm';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/first.css'



export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      city_name:"",
      lat:"",
      lon:"",
      lat_lon:'',
      map:'',
      showData:false,
      iframe:''
    }
  }
  handleLocation=(e)=>{
    let city_name=e.target.value;
    this.setState({
      city_name:city_name
    })
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    let config={
      method:"GET",
      baseURL:`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city_name}&format=json `
      
    }
    
    axios(config).then(res=>{
      let responseData=res.data[0]
      // console.log(responseData);
      this.setState({
        city_name:responseData.display_name,
        lon:responseData.lon,
        lat:responseData.lat,
        lat_lon:`${responseData.lat.toString()},${responseData.lon.toString()}`,
        showData:true,
        iframe:'iframe'

      })
      let configmap ={
        method:"GET",
        baseURL:`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&zoom=1-18
        &center=${this.state.lat_lon} `
  
  
      }
      console.log(this.state.lat_lon);
      axios(configmap).then(res2=>{
        let map = res2.config.baseURL
        console.log(map);
        console.log(res2);
        this.setState({
          map:map
          
      })
      
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
         
         <div className="ratio ratio-16x9 div_iframe">
      <iframe src={this.state.map}  title="country map" allowfullscreen className={this.state.iframe}></iframe>
    </div>
      </div>
    )
  }
}

export default App