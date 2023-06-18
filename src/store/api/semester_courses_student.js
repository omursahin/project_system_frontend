import {SEMESTER_COURSE_STUDENT_PATH} from "../../helpers/urls";
import baseApi from "./baseApiEndpoints";

// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesterCourseStudent: builder.query({
      query: (id) => `${SEMESTER_COURSE_STUDENT_PATH}?semester_course=${id}`,
        providesTags: ['SemesterCourseStudent']
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllSemesterCourseStudentQuery } = authApi;
