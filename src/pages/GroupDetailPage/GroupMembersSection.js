import React from 'react';
import { Badge, Card, ListGroup } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import GroupMemberAddModal from './GroupMemberAddModal';

export const GroupMembersSection = ({ group }) => {
  return (
    <Card className='mt-3'>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <div>Grup Üyeleri</div>
          <div>
            <GroupMemberAddModal groupId={group.id} />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <ListGroup as="ol" numbered className=' list-group-flush'>
          {group?.group_members?.map((member) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{member.member.first_name} {member.member.last_name} {member?.is_supervisor && <Badge pill className="group_info_badge" bg="primary">
                  Supervisor
                </Badge>}
                </div>
                <small className='text-muted'>{member.member.email}</small>
              </div>
              {member?.is_accepted ? <CheckCircleFill className="text-success" /> : <XCircleFill className="text-danger" />}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
