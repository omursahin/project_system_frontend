import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetGroupByIdQuery } from '../../store/api/groups';
import { Col, Container, Row } from 'react-bootstrap';
import './style.css';
import { GroupInfoSection } from './GroupInfoSection';
import { GroupMembersSection } from './GroupMembersSection';
import { GroupProjectsSection } from './GroupProjectsSection';

export const GroupDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: group, isLoading } = useGetGroupByIdQuery(id);

  if (isLoading) {
    return 'Loading...';
  }

  if (!group) {
    navigate('/groups');
  }

  return (
    <>
      <div>
        <h2 className="text-center mb-4">
          {group?.semester_course?.course?.title} (
          {`${group?.semester_course?.semester?.year} - ${
            group?.semester_course?.semester?.year + 1
          } ${['Güz', 'Bahar', 'Yaz'][group?.semester_course?.semester?.term]}`}
          )
        </h2>
        <Container>
          <Row>
            <Col lg xl={6} xxl={8}>
              <GroupInfoSection group={group} />
              <hr className="hr" />
              <GroupMembersSection group={group} />
            </Col>
            <Col>
              <GroupProjectsSection group={group} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
