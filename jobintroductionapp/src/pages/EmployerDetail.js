import { useEffect, useState } from "react";
import { Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Api, { endpoints } from "../configs/Api";

const EmployerDetail = () => {
    const [employer, setEmployer] = useState([])
    const { employerId } = useParams()

    useEffect(() => {
        let res;
        const loadEmloyerById = async () => {
            res = await Api.get(endpoints['employer-detail'](employerId))
            setEmployer(res.data)
        }
        loadEmloyerById()
    }, []) 

    if(employer===null)
        return <Spinner animation="border"/>
    return (
        <>
        <h1 class="text-center text-danger">Chi tiết về nhà tuyển dụng</h1>
        <Col md = {4} xs={12}>
        <p>Tên công ty: {employer.companyname}</p>
        <p>Tên nhà tuyển dụng: {employer.name}</p>
        <p>Vị trí công việc: {employer.workplace}</p>
        </Col>
        {/* <p>Địa chỉ: {work.address}</p>
        <p>Mức lương: {work.salary}</p>
        <p>Kinh nghiệm: {work.experience}</p>
        <p>Trình độ học vấn: {work.education}</p>
        <p>Mô tả: {work.describe}</p> */}
        {/* <Row>
            <Col md={5} xs={12}>   
                 <Image src={work.image} rounded fluid />
            </Col>
            <Col md = {4} xs={12}>
                <h3>{work.title}</h3>
                <p>Vị trí tuyển dụng: {work.vacancies}</p>
                <p>Địa chỉ: {work.address}</p>
                <p>Mức lương: {work.salary}</p>
                <p>Kinh nghiệm: {work.experience}</p>
                <p>Trình độ học vấn: {work.education}</p>
                <p>Mô tả: {work.describe}</p>
            </Col>
        </Row> */}
        </>
    )
}
export default EmployerDetail;