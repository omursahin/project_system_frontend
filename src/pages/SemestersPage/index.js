import React, { useEffect, useState } from 'react';
import { useGetAllSemestersQuery } from '../../store/api/semesters';
import Table from '../../components/general/Table';
import { Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import SemesterModal from './SemesterModal';
import ConfirmModal from '../../components/general/Modal/ConfirmModal';

export const SemestersPage = () => {
  const { data: semesters, isLoading } = useGetAllSemestersQuery();

  // useEffect(() => console.log(semesters), [semesters]);

  //TODO Bir tablo kullanılarak semesters.result içindeki veriler görüntülenmeli

  const handleDelete = (id) => {
    alert('Handle Delete: ' + id);
  };

  return (
    <>
      <div>
        {semesters?.results && !isLoading ? (
          <Table
            tableTitle="Dönem Listesi"
            searchable={true}
            addNewEntry={<SemesterModal />}
            head={[
              { name: 'ID', sortable: 'numeric', width: 1 },
              { name: 'Dönem', sortable: 'alpha' },
              { name: 'Yıl', sortable: 'numeric' },
              { name: 'Eylem', width: 1 },
            ]}
            body={semesters.results.map((semester) => [
              semester.id,
              ['Güz', 'Bahar', 'Yaz'][semester.term],
              `${semester.year} - ${semester.year + 1}`,
              <>
                <SemesterModal isEdit={true} data={semester} />
                <ConfirmModal
                  title="Dönem Silme"
                  body="Bu dönemi silmek istediğinizden emin misiniz?"
                  onConfirm={() => handleDelete(semester.id)}
                  btn={
                    <>
                      <TrashFill size={15} />
                      <span className="d-none d-md-block">Sil</span>
                    </>
                  }
                />
              </>,
            ])}
          />
        ) : (
          'Loading...'
        )}
      </div>
    </>
  );
};
