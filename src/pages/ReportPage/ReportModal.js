import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { PlusSquareDotted, PencilFill } from "react-bootstrap-icons";
import {
  useReportCreateMutation,
  useReportUpdateMutation,
} from "../../store/api/reports";
import { useGetAllSemesterCoursesQuery } from "../../store/api/semester_courses";

import { notificationActions } from "../../store/notification/notification-slice";
import { useDispatch } from "react-redux";

function ReportModal({ isEdit = false, reportData = {} }) {
  const [title, setTitle] = useState(reportData?.title);
  const [description, setDescription] = useState(reportData?.description);
  const [is_final, setisFinal] = useState(reportData?.is_final);
  const [is_public, setisPublic] = useState(reportData?.is_public);
  const [semester_course, setSemesterCourse] = useState(
    reportData?.semester_course?.id
  );

  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllSemesterCoursesQuery();

  const [update] = useReportUpdateMutation();
  const [create] = useReportCreateMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const save = async () => {
    let response = null;
    if (reportData?.id) {
      const payload = {
        id: reportData.id,
        title,
        description,
        is_final,
        is_public,
        semester_course,
      };
      response = await update(payload);
    } else {
      const payload = {
        title,
        description,
        is_final,
        is_public,
        semester_course,
      };
      response = await create(payload);
    }

    if (response.error) {
      dispatch(
        notificationActions.showMessage({
          header: "Hata",
          message: "Bir hata ile karşılaşıldı...",
          variant: "danger",
        })
      );
    } else {
      dispatch(
        notificationActions.showMessage({
          header: "Giriş",
          message: "Başarı ile eklendi/güncellendi",
          variant: "success",
        })
      );
    }
    setShow(false);
  };

  return (
    <>
      <Button
        variant={isEdit ? "outline-primary" : "primary"}
        onClick={handleShow}
      >
        {isEdit ? (
          <PencilFill size={15}></PencilFill>
        ) : (
          <PlusSquareDotted size={20} />
        )}
        <span className="d-none d-md-block">
          {isEdit ? "Düzenle" : "Rapor Ekle"}
        </span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dönem {isEdit ? "Güncelle" : "Ekle"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="semester_course">
              <Form.Label>SemesterCourse</Form.Label>
              <Form.Select
                aria-label="semester_course"
                defaultValue={semester_course && semester_course}
                onChange={(e) => setSemesterCourse(e.target.value)}
              >
              
              {!isLoading ? (
                  <>
                    <option value="">Lütfen Değer seçiniz</option>
                    {data?.results.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.semester.year} - {item.semester.year + 1} /{" "}
                        {item.course.title}
                      </option>
                    ))}
                  </>
                ) : null}
                
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                value={title || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                defaultValue={description || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="isFinal">
              <Form.Check
                type="checkbox"
                label="Final"
                checked={is_final || false}
                onChange={(e) => setisFinal(e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="isPublic">
              <Form.Check
                type="checkbox"
                label="Genel"
                checked={is_public || false}
                onChange={(e) => setisPublic(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={save}>
            {isEdit ? "Güncelle" : "Ekle"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReportModal;
