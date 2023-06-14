import React, { useEffect, useState } from 'react';
import Table from '../../components/general/Table';
import { Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import CourseModal from './CourseModal';
import ConfirmModal from '../../components/general/Modal/ConfirmModal';
import {notificationActions} from "../../store/notification/notification-slice";
import {useDispatch} from "react-redux";
import {useGetAllCoursesQuery} from "../../store/api/courses";

export const CoursesPage = () => {

  const { data: courses, isLoading } = useGetAllCoursesQuery();

  const handleDelete = async (id) => {
      alert(id);
  };

  return (
    <>
      <div>
        {courses?.results && !isLoading ? (
          <Table
            tableTitle="Ders Listesi"
            searchable={true}
            addNewEntry={<CourseModal />}
            head={[
              { name: 'ID', sortable: 'numeric', width: 1 },
              { name: 'Dönem', sortable: 'alpha' },
              { name: 'Yıl', sortable: 'numeric' },
              { name: 'Eylem', width: 1 },
            ]}
            body={courses.results.map((course) => [
              course.id,
              ['Güz', 'Bahar', 'Yaz'][course.term],
              `${course.year} - ${course.year + 1}`,
              <>
                <CourseModal isEdit={true} data={course} />
                <ConfirmModal
                  title="Dönem Silme"
                  body="Bu dönemi silmek istediğinizden emin misiniz?"
                  onConfirm={() => handleDelete(course.id)}
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
