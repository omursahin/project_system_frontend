import React from 'react';
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import GroupModal from "./GroupModal";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import { AiOutlineCheckSquare,AiOutlineCloseSquare } from "react-icons/ai";

const Cards = ({groups}) => {
    return (
        <Container style={{ minHeight: '100vh' }}>
            <Row className="justify-content-center">
                <Col className="text-center">
                    <h2>GRUPLAR</h2>
                    <div style={{border: '1px solid black'}}></div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col >
                    <GroupModal/>
                </Col>
            </Row>
            <Row className="g-4 justify-content-md-center mt-1">

                {groups?.results?.map((group) => (
                    <Col xs={1} md={6} xl={6}  key={group.id}>
                        <Card className="mx-auto p-1" >
                            <Card.Body style={{ background: '#EEEEEE' }}>
                                <Card.Title>{group.title
                                }</Card.Title>
                                <Card.Text>
                                    <Container>
                                        <Row>
                                            <Col sm={8} md={8} xl={8}>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item>Açıklama: {group.description}</ListGroup.Item>
                                                    <ListGroup.Item>
                                                        Dönem: {group.semester_course.semester.year}-
                                                        {group.semester_course.semester.year+1}
                                                        /{group.semester_course.course.title}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        Maksimum Grup Boyutu: {group.semester_course.max_group_size}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={{fontFamily:'cursive'}}>
                                                        {group.invitation_code}
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                            <Col sm={4} md={4} xl={4}>
                                                <Stack direction="vertical" gap={3}>
                                                    <div className="text-md-center">
                                                        Durum:
                                                        {group.is_active ?
                                                            <AiOutlineCheckSquare style={{color:'green',fontSize: "3.5em"}} />
                                                            : <AiOutlineCloseSquare style={{color:'red',fontSize: "3.5em"}}/>}
                                                    </div>
                                                    <div className="text-md-center">
                                                        Second item
                                                    </div>
                                                </Stack>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
export default Cards