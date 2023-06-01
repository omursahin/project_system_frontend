import {COURSES_PATH, SEMESTERS_PATH} from "../../helpers/urls";
import baseApi from "./baseApiEndpoints";

// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => `${COURSES_PATH}`,
        providesTags: ['Courses']
    }),
    coursesUpdate: builder.mutation({
      query: (payload) => ({
        url: `${COURSES_PATH}${payload?.id}/`,
        method: "PATCH",
        body: payload
      }),
      invalidatesTags: ['Courses']
    }),
    coursesCreate: builder.mutation({
      query: (payload) => ({
        url: `${COURSES_PATH}`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['Courses']
    }),
    coursesRemove: builder.mutation({
      query: (id) => ({
        url: `${COURSES_PATH}${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Courses']
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllCoursesQuery, useCoursesUpdateMutation, useCoursesCreateMutation, useCoursesRemoveMutation } = authApi;
