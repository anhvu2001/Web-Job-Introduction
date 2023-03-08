
import { Card, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "./Body";

export default function JobCard(props){
  let path = `/work/${props.id}/`
    return(
        <Col md={4} xs={8}>
        <Card style={{ width: '18rem' }}>
          <Nav as ={Link} to = {path}>
             <Card.Img variant="top" src={props.image_path} />
          </Nav >
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
           Địa chỉ : {props.address}
           <p>Ngày tạo :{props.created_date}</p>
          </Card.Text>
        </Card.Body>
      </Card>
      </Col>
    )
}