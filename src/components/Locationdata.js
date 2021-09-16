import React, { Component } from "react";
import "./first.css";

export class Locationdata extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
        <div>
            

            <table className="table table-dark table-striped">
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
  <td>{this.props.location.display_name}</td>
  <td>{this.props.location.lon}</td>
  <td>{this.props.location.lat}</td>
</tr>

</tbody>
</table>
<div className="ratio ratio-16x9 div_iframe">
  <iframe src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&zoom=1-18
                    &center=${this.props.location.lat},${this.props.location.lon}`}
                      title="country map" allowFullScreen className='iframe'>
                      </iframe>
</div>
        </div>
    )
  }
}

export default Locationdata;
