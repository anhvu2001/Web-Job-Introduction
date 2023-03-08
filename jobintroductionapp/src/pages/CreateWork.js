import { useContext, useRef, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Api, { endpoints } from "../configs/Api"
import { UserContext } from "../layouts/Body"

const CreateWork=()=> {
    const [career, setCareer] = useState()
    const [title, setTitle] = useState()
    const [address, setAddress] = useState()
    const [vacancies, setVacancies] = useState()
    const [salary, setSalary] = useState()
    const [experience, setExperience] = useState()
    const [education, setEducation] = useState()
    const [describe, setDescribe] = useState()
    const [user, dispatch] = useContext(UserContext)
    const image = useRef()
    const nav = useNavigate()

    const create = (evt) => {
        evt.preventDefault()

        let createWork = async () => {
            const formData = new FormData()
            formData.append("career", career)
            formData.append("title", title)
            formData.append("address", address)
            formData.append("vacancies", vacancies)
            formData.append("salary", salary)
            formData.append("experience", experience)
            formData.append("education", education)
            formData.append("describe", describe)
            formData.append("employer", user.id)
            formData.append("image", image.current.files[0])
            
            let res = await Api.post(endpoints['work'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.info(res.data)
        }  
        createWork()
    }

    return (
        <>
        <Container>
            <h1 className="text-center text-success">ĐĂNG KÝ NGƯỜI DÙNG</h1>
            <Form onSubmit={create}>
                <CreateWorkForm id="career" label="career" 
                                type="text" value={career}
                                change={(evt) => setCareer(evt.target.value)}/>

                <CreateWorkForm id="title" label="title" 
                                type="text" value={title}
                                change={(evt) => setTitle(evt.target.value)}/>

                <CreateWorkForm id="address" label="address" 
                                type="text" value={address}
                                change={(evt) => setAddress(evt.target.value)}/>

                <CreateWorkForm id="vacancies" label="vacancies" 
                                type="text" value={vacancies}
                                change={(evt) => setVacancies(evt.target.value)}/>

                <CreateWorkForm id="salary" label="salary" 
                                type="number" value={salary}
                                change={(evt) => setSalary(evt.target.value)}/>

                <CreateWorkForm id="experience" label="experience" 
                                type="text" value={experience}
                                change={(evt) => setExperience(evt.target.value)}/>

                <CreateWorkForm id="education" label="education" 
                                type="text" value={education}
                                change={(evt) => setEducation(evt.target.value)}/>

                <CreateWorkForm id="describe" label="describe" 
                                type="text" value={describe}
                                change={(evt) => setDescribe(evt.target.value)}/>   

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" ref={image} className="form-control"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
        </>
    )
}
    
export default CreateWork

function CreateWorkForm(props) {
    return (
    <Form.Group className="mb-3" controlId={props.id}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control type={props.type} 
                    value={props.value} 
                    onChange={props.change}/>
    </Form.Group>
    )
}