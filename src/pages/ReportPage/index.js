import React, { useEffect, useState } from 'react';
import Table from '../../components/general/Table';
import { Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import ConfirmModal from '../../components/general/Modal/ConfirmModal';
import {notificationActions} from "../../store/notification/notification-slice";
import {useDispatch} from "react-redux";
import ReportModal from "./ReportModal";
import {useGetAllReportsQuery} from "../../store/api/reports";

export const ReportPage = () => {

  const { data, isLoading } = useGetAllReportsQuery();

  const handleDelete = async (id) => {
      alert(id);
  };

  console.log(data);
  return (
    <>
      <div>
        {data?.results && !isLoading ? (
          <Table
            tableTitle="Rapor Listesi"
            searchable={true}
            addNewEntry={<ReportModal />}
            head={[
              { name: 'ID', sortable: 'numeric', width: 1 },
              { name: 'Dönem', sortable: 'alpha' },
              { name: 'Yıl', sortable: 'numeric' },
              { name: 'Eylem', width: 1 },
            ]}
            body={data.results.map((semester_course) => [
                semester_course.id,
              ['Güz', 'Bahar', 'Yaz'][semester_course.term],
              `${semester_course.year} - ${semester_course.year + 1}`,
              <>
                <ReportModal isEdit={true} data={semester_course} />
                <ConfirmModal
                  title="Rapor Silme"
                  body="Bu raporu silmek istediğinizden emin misiniz?"
                  onConfirm={() => handleDelete(semester_course.id)}
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
