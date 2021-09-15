import React, { Component } from "react";
import {Row,Card,Col} from "react-bootstrap"

export class Movie extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.movielist);
    return <div>
<Row xs={1} md={3} className="g-4">
  {this.props.movielist.map((item, idx) => (
    <Col>
      <Card style={{width:'380px',height:'400px' ,overflow:'scroll',border:'solid black 4px'}}>
        <Card.Img variant="top" src={item.image_url} style={{width:'300px' ,marginLeft:'40px',height:'200px'}} alt="no Image source"/>
        <Card.Body>
          <Card.Title>title:{item.title}</Card.Title>
          <Card.Text>
           {item.overview}
           <ul>
               <li>average_votes : <strong>{item.average_votes}</strong></li>
               <li>total_votes :<strong> {item.total_votes}</strong></li>
               <li>popularity : <strong>{item.popularity}</strong></li>
               <li>released_on : <strong>{item.released_on}</strong></li>
           </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

    </div>;
  }
}

export default Movie;
