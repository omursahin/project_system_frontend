import React, {useEffect, useState} from 'react';
import Table from '../../components/general/Table';
import {Button} from 'react-bootstrap';
import {TrashFill} from 'react-bootstrap-icons';
import CourseModal from './CourseModal';
import ConfirmModal from '../../components/general/Modal/ConfirmModal';
import {notificationActions} from "../../store/notification/notification-slice";
import {useDispatch} from "react-redux";
import {useCourseRemoveMutation, useGetAllCoursesQuery} from "../../store/api/courses";

export const CoursesPage = () => {
    const dispatch = useDispatch();

    const [remove, isSuccess] = useCourseRemoveMutation();
    const {data: courses, isLoading} = useGetAllCoursesQuery();

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

    console.log(courses);
    return (
        <>
            <div>
                {courses?.results && !isLoading ? (
                    <Table
                        tableTitle="Ders Listesi"
                        searchable={true}
                        addNewEntry={<CourseModal/>}
                        head={[
                            {name: 'ID', sortable: 'numeric', width: 1},
                            {name: 'Kod'},
                            {name: 'Başlık'},
                            {name: 'Açıklama'},
                            {name: 'Eylem', width: 1},
                        ]}
                        body={courses.results.map((course) => [
                            course.id,
                            course.code,
                            course.title,
                            course.description,
                            <>
                                <CourseModal isEdit={true} data={course}/>
                                <ConfirmModal
                                    title="Dönem Silme"
                                    body="Bu dönemi silmek istediğinizden emin misiniz?"
                                    onConfirm={() => handleDelete(course.id)}
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
