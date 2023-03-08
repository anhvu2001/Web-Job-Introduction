import { useContext, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import cookie from "react-cookies"
import { Navigate } from "react-router-dom"
import Api, { authApi, endpoints } from "../configs/Api"
import { UserContext } from "../layouts/Body"


const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [user, dispatch] = useContext(UserContext)

    const login = async (evt) => {
        evt.preventDefault()

        const res = await Api.post(endpoints['login'], {
            'username': username,
            'password': password,
            'client_id': 'DAzNOlbzrdBbIaY4uAEIHtPAtKECwQ6IJ8R858Jt',
            'client_secret': 'uFxe5UbfKctH6RfSlKa6EY3LYGSTD6ji71KIWVqywBV5RW7OtCFdZqpBotZElLkPYAaa2gK0pYDSWOO0Xk1jqeZUeq2PuDsFdcUgPoOHb3enWWpYaKjjJnW85cWbQigH',
            'grant_type': 'password'
        })

        console.info(res.data)
        cookie.save('token', res.data.access_token)

        const user = await authApi().get(endpoints['current-user'])
        console.info(user.data)
        
        dispatch({
            'type': 'login',
            'payload': user.data
        })
    }

    if (user != null)
        return <Navigate to="/" />

    return (
        <>
        <Container>
            <h1 className="text-center text-danger">ĐĂNG NHẬP</h1>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" 
                        value={username} 
                        onChange={(evt) => setUsername(evt.target.value)}
                        placeholder="Nhập username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                            value={password} 
                            onChange={(evt) => setPassword(evt.target.value)}
                            placeholder="Nhập password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
        </>
    )
}

export default Login