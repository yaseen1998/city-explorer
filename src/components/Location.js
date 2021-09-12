import React, { Component } from 'react'

export class Location extends Component {
    render() {
        return (
            <div>
                

                <table class="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">city name</th>
      <th scope="col">longitude</th>
      <th scope="col">latitude</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{this.props.city_name}</td>
      <td>{this.props.lat}</td>
      <td>{this.props.lon}</td>
    </tr>
   
  </tbody>
</table>

            </div>
        )
    }
}

export default Location