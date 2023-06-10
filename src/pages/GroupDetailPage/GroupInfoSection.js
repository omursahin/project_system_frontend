import React from 'react';
import { Badge } from 'react-bootstrap';

export const GroupInfoSection = ({ group }) => {
  return (
    <div className="group_info" style={{ background: 'rgba(255,0,0,.2)' }}>
      <div className="d-flex flex-row gap-4 justify-content-between align-items-start">
        <h4>{group.title}</h4>
        <div className="flex-column flex-xxl-row d-flex gap-1 ">
          <Badge className="group_info_badge" bg="primary">
            Maksimum Üye: {group.max_size}
          </Badge>
          <Badge
            className="group_info_badge"
            bg={
              { A: 'success', P: 'info', D: 'secondary', R: 'danger' }[
                group.status
              ] || 'dark'
            }
          >
            {{
              A: 'Approved',
              P: 'Pending...',
              D: 'Draft',
              R: 'Rejected',
            }[group.status] || 'Unknown'}
          </Badge>
        </div>
      </div>
      {group.description && <p>{group.description}</p>}
      <div>
        <span>Grup Sahibi: </span>
        <span>{group.owner.email}</span>
      </div>
      <div>
        <span>Davet Kodu: </span>
        <span>{group.invitation_code}</span>
      </div>
    </div>
  );
};
