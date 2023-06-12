import React from 'react';
import { Card } from 'react-bootstrap';

export const GroupProjectsSection = ({ group }) => {
  return (
    <Card className='mt-lg-0 mt-3'>
      <Card.Header>Grup Projeleri</Card.Header>
      <Card.Body>
        {JSON.stringify(group?.group_projects, null, 2)}
      </Card.Body>
    </Card>
  );
};
