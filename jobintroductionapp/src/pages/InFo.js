import { useContext } from "react"
import { Card } from "react-bootstrap"

import { UserContext } from "../layouts/Body"

const InFor= ()=>{
    const [user, dispatch] = useContext(UserContext)

    return(
        <>
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={user.avatar_path} />
            <Card.Body>
                <Card.Title><h3>Họ và tên: {user.last_name} {user.first_name}</h3></Card.Title>
                <Card.Text>
                     <h3>Email: {user.email}</h3>
                </Card.Text>
            </Card.Body>
            </Card>
            </>
    )
}
export default InFor