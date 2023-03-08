
import { useContext } from "react";
import { Container, Navbar, Nav} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./Body";

export default function Header(){
    const [user, dispatch] = useContext(UserContext)
    const nav = useNavigate()

    const logout = (evt) => {
        evt.preventDefault()

        dispatch({
            "type": "logout"
        })

        nav('/')
    }
    let btn = <>
        <Link to="/login" className="nav-link text-danger">Đăng nhập</Link>
        <Link to="/register" className="nav-link text-danger">Đăng ký</Link>
    </>
    if (user != null)
        btn = <>
            <Link to="info" className="nav-link text-danger">{user.username}</Link>
            <a href="logout" onClick={logout} className="nav-link text-danger">Đăng xuất</a>
        </>

    let taoviec=<>
        </>
    if(user != null)
        if(user.is_employer ==true)
        taoviec=<>
            <Link className="nav-link" to="/creatework">Tạo việc</Link>
        </>
    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">HỆ THỐNG GIỚI THIỆU VIỆC LÀM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/employer">Nhà tuyển dụng</Link>
                    <Link className="nav-link" to="/gioi-thieu">Giới thiệu</Link>
                    {taoviec}
                    {btn}
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    )
    
}