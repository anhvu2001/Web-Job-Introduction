import { useRef, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Api, { endpoints } from "../configs/Api"

function Register() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const avatar = useRef()
    const nav = useNavigate()

    const register = (evt) => {
        evt.preventDefault()

        let registerUser = async () => {
            const formData = new FormData()
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("username", username)
            formData.append("password", password)
            formData.append("email", email)
            formData.append("avatar", avatar.current.files[0])
            
            let res = await Api.post(endpoints['register'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.info(res.data)
            if (res.data != null)
                nav('/login')
        }
        if (password !== null && password === confirmPassword) {
            registerUser()
        }
    }

    return (
        <>
        <Container>
            <h1 className="text-center text-success">ĐĂNG KÝ NGƯỜI DÙNG</h1>
            <Form onSubmit={register}>
                <RegisterForm id="firstName" label="First name" 
                                type="text" value={firstName}
                                change={(evt) => setFirstName(evt.target.value)}/>
                <RegisterForm id="lastName" label="Last name" 
                                type="text" value={lastName}
                                change={(evt) => setLastName(evt.target.value)}/>
                <RegisterForm id="email" label="Email" 
                                type="email" value={email}
                                change={(evt) => setEmail(evt.target.value)}/>
                <RegisterForm id="username" label="Username" 
                                type="text" value={username}
                                change={(evt) => setUsername(evt.target.value)}/>
                <RegisterForm id="password" label="Password" 
                                type="password" value={password}
                                change={(evt) => setPassword(evt.target.value)}/>
                <RegisterForm id="confirmPassword" label="Confirm password
                " 
                                type="password" value={confirmPassword}
                                change={(evt) => setConfirmPassword(evt.target.value)}/>
                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" ref={avatar} className="form-control"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
        </>
        
    )
}

export default Register

function RegisterForm(props) {
    return (
    <Form.Group className="mb-3" controlId={props.id}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control type={props.type} 
                    value={props.value} 
                    onChange={props.change}/>
    </Form.Group>
    )
}