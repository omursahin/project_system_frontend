import React from 'react';

export const GroupProjectsSection = ({ group }) => {
  return (
    <div className="group_projects" style={{ background: 'rgba(0,0,255,.2)' }}>
      <h5>Grup Projeleri</h5>
      <pre>{JSON.stringify(group.group_projects, null, 2)}</pre>
    </div>
  );
};
