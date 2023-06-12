import React from 'react';
import { Badge, Card, ListGroup } from 'react-bootstrap';

export const GroupProjectsSection = ({ group }) => {
  return (
    <Card className='mt-lg-0 mt-3'>
      <Card.Header>Grup Projeleri</Card.Header>
      <Card.Body>
        <ListGroup as="ol" numbered className=' list-group-flush'>
          {group?.group_projects?.map((project) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{project.title}</div>
                {project.description}
              </div>
              <Badge
                className="group_info_badge"
                bg={
                  { A: 'success', P: 'info', D: 'secondary', R: 'danger' }[
                  project?.status
                  ] || 'dark'
                }
              >
                {{
                  A: 'Approved',
                  P: 'Pending...',
                  D: 'Draft',
                  R: 'Rejected',
                }[project?.status] || 'Unknown'}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
