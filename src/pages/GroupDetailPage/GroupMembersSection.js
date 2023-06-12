import React from 'react';
import { Card } from 'react-bootstrap';

export const GroupMembersSection = ({ group }) => {
  return (
    <Card className='mt-3'>
      <Card.Header>Grup Üyeleri</Card.Header>
      <Card.Body>
        {JSON.stringify(group?.group_members, null, 2)}
      </Card.Body>
    </Card>
  );
};
