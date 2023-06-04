import React, { useEffect, useState } from 'react';
import Table from '../../components/general/Table';
import { Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import ConfirmModal from '../../components/general/Modal/ConfirmModal';
import {notificationActions} from "../../store/notification/notification-slice";
import {useDispatch} from "react-redux";
import ReportModal from "./ReportModal";
import {useGetAllReportsQuery,useReportRemoveMutation} from "../../store/api/reports";

export const ReportPage = () => {
  const dispatch = useDispatch();

  const [remove, isSuccess] = useReportRemoveMutation();
  const { data: reports, isLoading } = useGetAllReportsQuery();
  useEffect(() => {
   console.log(reports)
}, []);
  
  const handleDelete = async (id) => {
    await remove(id);
    if (isSuccess) {
        dispatch(notificationActions.showMessage({
            header: "Giriş",
            message: "Başarı ile silindi...",
            variant: "success"
        }));
    } else {
        dispatch(notificationActions.showMessage({
            header: "Hata",
            message: "Bir hata ile karşılaşıldı...",
            variant: "danger"
        }));
    }
};

  return (
    <>
    <div>
      {reports?.results && !isLoading ? (
        <Table
          tableTitle="Rapor Listesi"
          searchable={true}
          addNewEntry={<ReportModal />}
          head={[
            { name: 'ID', sortable: 'numeric', width: 1 },
            { name: 'Dönem', sortable: 'alpha' },
            { name: 'Başlık', sortable: 'alpha' },
            { name: 'Açıklama' },
            { name: 'Genel', sortable: 'alpha' },
            { name: 'Final', sortable: 'alpha' },
            { name: 'Eylem', width: 1 },
          ]}
          body={reports.results.map((report) => [
            report.id,
            `${report.semester_course.semester.year} 
            - ${report.semester_course.semester.year + 1} /
            ${report.semester_course.course.title}
            `,
            report.title,
            report.description,
            report.is_public ? 'X' : '',
            report.is_final ? 'X' : '',
            <>
              <ReportModal isEdit={true} data={report} />
              <ConfirmModal
                title="Rapor Silme"
                body="Bu raporu silmek istediğinizden emin misiniz?"
                onConfirm={() => handleDelete(report.id)}
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
        'Yükleniyor...'
      )}
    </div>
  </>
  );
};
