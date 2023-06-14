import React, {useEffect, useState} from 'react';
import Table from '../../components/general/Table';
import {Button} from 'react-bootstrap';
import {TrashFill} from 'react-bootstrap-icons';
import ConfirmModal from '../../components/general/Modal/ConfirmModal';
import {notificationActions} from "../../store/notification/notification-slice";
import {useDispatch} from "react-redux";
import {useGetAllSemesterCoursesQuery, useSemesterCoursesRemoveMutation} from "../../store/api/semester_courses";
import SemesterCourseModal from "./SemesterCourseModal";
import {getSemesterType} from "../../helpers/typeConverters";

export const SemesterCoursePage = () => {

    const dispatch = useDispatch();
    const [remove, isSuccess] = useSemesterCoursesRemoveMutation();
    const {data: semester_courses, isLoading} = useGetAllSemesterCoursesQuery();

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
                {semester_courses?.results && !isLoading ? (
                    <Table
                        tableTitle="Dönem Dersi Listesi"
                        searchable={true}
                        addNewEntry={<SemesterCourseModal/>}
                        head={[
                            {name: 'ID', sortable: 'numeric', width: 1},
                            {name: 'Dönem', sortable: 'alpha'},
                            {name: 'Ders', sortable: 'alpha'},
                            {name: 'Kontenjan', sortable: 'numeric'},
                            {name: 'Eylem', width: 1},
                        ]}
                        body={semester_courses.results.map((semester_course) => [
                            semester_course.id,

                            `${semester_course.semester.year}
                - ${semester_course.semester.year + 1} / 
                ${getSemesterType(semester_course.semester.term)}`,

                            `${semester_course.course.title}`,

                            semester_course.max_group_size,
                            <>
                                <SemesterCourseModal isEdit={true} data={semester_course}/>
                                <ConfirmModal
                                    title="Dönem Dersi Silme"
                                    body="Bu dönem dersini silmek istediğinizden emin misiniz?"
                                    onConfirm={() => handleDelete(semester_course.id)}
                                    btn={
                                        <>
                                            <TrashFill size={15}/>
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
