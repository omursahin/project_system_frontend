import {SEMESTERS_PATH} from "../../helpers/urls";
import baseApi from "./baseApiEndpoints";

// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: () => `${SEMESTERS_PATH}`,
        providesTags: ['Semesters']
    }),
    semesterUpdate: builder.mutation({
      query: (payload) => ({
        url: `${SEMESTERS_PATH}${payload?.id}/`,
        method: "PATCH",
        body: payload
      }),
      invalidatesTags: ['Semesters']
    }),
    semesterCreate: builder.mutation({
      query: (payload) => ({
        url: `${SEMESTERS_PATH}`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['Semesters']
    }),
    semesterRemove: builder.mutation({
      query: (id) => ({
        url: `${SEMESTERS_PATH}${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Semesters']
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllSemestersQuery, useSemesterUpdateMutation, useSemesterCreateMutation, useSemesterRemoveMutation } = authApi;
