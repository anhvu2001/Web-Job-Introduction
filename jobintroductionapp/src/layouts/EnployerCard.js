
import { Card, Col, Nav } from "react-bootstrap";

export default function EmployerCard(props){
    let path = `/employer/${props.id}/`
    return(
        <Col md={3} xs={9}>
        <Card style={{ width: '15rem' }}>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Title>{props.workplace}</Card.Title>
        </Card.Body>
          <Nav.Link href = {path}>
             <h6>{props.companyname}</h6>
          </Nav.Link >
      </Card>
      </Col>
    )
}