import React from 'react';
import { Badge, Button, Card, ListGroup } from 'react-bootstrap';
import { CheckCircleFill, TrashFill, XCircleFill } from 'react-bootstrap-icons';
import GroupMemberAddModal from './GroupMemberAddModal';
import { useGroupMemberRemoveMutation } from '../../store/api/group_members';

export const GroupMembersSection = ({ group, groupMemberAdded = () => { }, groupMemberRemoved = () => { } }) => {
  const [removeGroupMember] = useGroupMemberRemoveMutation();

  const removeMember = (memberId) => async () => {
    await removeGroupMember(memberId);
    groupMemberRemoved();
  }
  return (
    <Card className='mt-3'>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <div>Grup Üyeleri</div>
          <div>
            <GroupMemberAddModal semesterCourseId={group.semester_course.id} groupId={group.id} added={groupMemberAdded} />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <ListGroup as="ul" className=' list-group-flush'>
          {group?.group_members?.map((member) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-center"
              key={member.id}
            >
              {member?.is_accepted ? <CheckCircleFill className="text-success" /> : <XCircleFill className="text-danger" />}
              <div className="ms-3 me-auto">
                <div className="fw-bold">{member.member.first_name} {member.member.last_name} {member?.is_supervisor && <Badge pill className="group_info_badge" bg="primary">
                  Supervisor
                </Badge>}
                </div>
                <small className='text-muted'>{member.member.email}</small>
              </div>
              <Button
                variant={"danger"}
                onClick={removeMember(member.id)}
                size={'sm'}
              >
                <TrashFill size={15} />
                <span className="d-none d-md-block">Sil</span>
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
