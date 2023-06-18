import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { EditableTextInput } from '../../components/general/Form/EditableTextInput';
import { useGroupUpdateMutation } from '../../store/api/groups';

export const GroupInfoSection = ({ group }) => {
  const [update] = useGroupUpdateMutation();

  function save(field, value) {
    update({ id: group.id, [field]: value });
  }

  return (
    <Card>
      <Card.Header>
        <div className="d-flex  justify-content-between">
          <div>
            Grup Detayı
          </div>
          <div className="d-flex gap-1 ">
            <Badge className="group_info_badge" bg="primary">
              Maksimum Üye: {group?.max_size}
            </Badge>
            <Badge
              className="group_info_badge"
              bg={
                { A: 'success', P: 'info', D: 'secondary', R: 'danger' }[
                group?.status
                ] || 'dark'
              }
            >
              {{
                A: 'Approved',
                P: 'Pending...',
                D: 'Draft',
                R: 'Rejected',
              }[group?.status] || 'Unknown'}
            </Badge>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <EditableTextInput value={group?.title} callback={(value) => {
          save('title', value);
        }}>
          <h4>
            {group?.title}
          </h4>
        </EditableTextInput>
        <EditableTextInput value={group?.description} callback={(value) => {
          save('description', value);
        }}>
          {group?.description && <p>{group?.description}</p>}
        </EditableTextInput>

        <div>
          <span>Grup Sahibi: </span>
          <span>{group?.owner?.email}</span>
        </div>
        <div>
          <span>Davet Kodu: </span>
          <span>{group?.invitation_code}</span>
        </div>
      </Card.Body>
    </Card>
  );
};
