import React, { useEffect, useState } from 'react';
import Table from '../../components/general/Table';
import { Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import ConfirmModal from '../../components/general/Modal/ConfirmModal';
import {notificationActions} from "../../store/notification/notification-slice";
import {useDispatch} from "react-redux";
import {useGetAllSemesterCoursesQuery} from "../../store/api/semester_courses";
import SemesterCourseModal from "./SemesterCourseModal";

export const SemesterCoursePage = () => {

  const { data, isLoading } = useGetAllSemesterCoursesQuery();

  const handleDelete = async (id) => {
      alert(id);
  };

  console.log(data);
  return (
    <>
      <div>
        {data?.results && !isLoading ? (
          <Table
            tableTitle="Dönem Dersi Listesi"
            searchable={true}
            addNewEntry={<SemesterCourseModal />}
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
                <SemesterCourseModal isEdit={true} data={semester_course} />
                <ConfirmModal
                  title="Dönem Dersi Silme"
                  body="Bu dönem dersini silmek istediğinizden emin misiniz?"
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
