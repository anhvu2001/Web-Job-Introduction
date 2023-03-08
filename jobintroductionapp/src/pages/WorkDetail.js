import { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Api, { authApi, endpoints } from "../configs/Api";
import { UserContext } from "../layouts/Body";

const WorkDetail = () => {
    const [work, setWorks] = useState([])
    const { workId } = useParams()
    const [user, dispatch] = useContext(UserContext)


    useEffect(() => {
        let res;
        const loadWorkById = async () => {
            res = await Api.get(endpoints['work-detail'](workId))
            setWorks(res.data)
        }
        loadWorkById()
    }, []) 

    const ungTuyen = async (evt) => {
        evt.preventDefault()

        const res = await Api.post(endpoints['apply'], {
            'applycandidate': user.id,
            'appywork': workId,
        })

        console.info(res.data)
        if (res != null)
            alert("ỨNG TUYỂN THÀNH CÔNG")
    }

    if(work===null)
        return <Spinner animation="border"/>

    return (
        <>
        <h1 class="text-center text-danger">Chi tiết công việc</h1>
            
        <Row>
            <Col md={5} xs={12}>   
                 <Image src={work.image_path} rounded fluid />
            </Col>
            <Col md = {4} xs={12}>
                <h3>{work.title}</h3>
                <p>Vị trí tuyển dụng: {work.vacancies}</p>
                <p>Địa chỉ: {work.address}</p>
                <p>Mức lương: {work.salary}</p>
                <p>Kinh nghiệm: {work.experience}</p>
                <p>Trình độ học vấn: {work.education}</p>
                <p>Mô tả: {work.describe}</p>
                <Button variant="primary" type="submit" onClick={ungTuyen}>
                    Ứng tuyển
                </Button>
            </Col>
        </Row>
        </>
    )
}
export default WorkDetail;