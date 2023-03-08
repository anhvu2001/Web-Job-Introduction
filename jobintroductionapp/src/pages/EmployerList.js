import { useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
import Api, { endpoints } from "../configs/Api"
import EmployerCard from "../layouts/EnployerCard"

const EmployerList = ()=>{
    const [employer, setemployer]=useState([])

    useEffect(() =>{
        let loadEmloyer = async() =>  {
            try{
                let res = await Api.get(endpoints['employer'])
                setemployer(res.data.results)
            } catch(err){   
                console.error(err)
            } 
        }
        
        loadEmloyer()
    },[])


    return(
        <Container>
            <h1 class="text-center text-danger">Danh sách các nhà tuyển dụng </h1>
            
            <Row>
                {employer.map(c => {
                    return <EmployerCard name={c.name} companyname={c.companyname} workplace={c.workplace} id ={c.id}/>
                })}
            </Row>
       </Container>
    )

}
export default EmployerList