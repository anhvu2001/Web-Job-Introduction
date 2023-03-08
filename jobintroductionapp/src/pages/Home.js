import { useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
import Api, { endpoints } from "../configs/Api"
import JobCard from "../layouts/JobCard"

export default function Home(){
    const [work , setWork]= useState([])

    useEffect(() =>{
        let loadWork = async() =>  {
            try{
                let res = await Api.get(endpoints['work'])
                setWork(res.data.results)
            } catch(err){   
                console.error(err)
            } 
        }


        loadWork()
    },[])


    return(
        <Container>
            <h1 class="text-center text-danger">Danh sách các công việc </h1>
             <Row>
                {work.map(c => {
                    return <JobCard image_path={c.image_path} title={c.title} address={c.address} created_date={c.created_date} id={c.id}/>
                })}
            </Row>
       </Container>
    )
    
}