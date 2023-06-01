import {SEMESTER_COURSES_PATH, SEMESTERS_PATH} from "../../helpers/urls";
import baseApi from "./baseApiEndpoints";

// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesterCourses: builder.query({
      query: () => `${SEMESTER_COURSES_PATH}`,
        providesTags: ['SemesterCourses']
    }),
    semesterCoursesUpdate: builder.mutation({
      query: (payload) => ({
        url: `${SEMESTER_COURSES_PATH}${payload?.id}/`,
        method: "PATCH",
        body: payload
      }),
      invalidatesTags: ['SemesterCourses']
    }),
    semesterCoursesCreate: builder.mutation({
      query: (payload) => ({
        url: `${SEMESTER_COURSES_PATH}`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['SemesterCourses']
    }),
    semesterCoursesRemove: builder.mutation({
      query: (id) => ({
        url: `${SEMESTER_COURSES_PATH}${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['SemesterCourses']
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllSemesterCoursesQuery, useSemesterCoursesUpdateMutation, useSemesterCoursesCreateMutation, useSemesterCoursesRemoveMutation } = authApi;
