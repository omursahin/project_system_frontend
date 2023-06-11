import React from 'react';

export const GroupMembersSection = ({ group }) => {
  return (
    <div className="group_members" style={{ background: 'rgba(0,255,0,.2)' }}>
      <h5>Grup Üyeleri</h5>
      <pre>{JSON.stringify(group?.group_members, null, 2)}</pre>
    </div>
  );
};
