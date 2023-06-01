import {REPORTS_PATH, SEMESTERS_PATH} from "../../helpers/urls";
import baseApi from "./baseApiEndpoints";

// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: () => `${REPORTS_PATH}`,
        providesTags: ['Semesters']
    }),
    reportUpdate: builder.mutation({
      query: (payload) => ({
        url: `${REPORTS_PATH}${payload?.id}/`,
        method: "PATCH",
        body: payload
      }),
      invalidatesTags: ['Semesters']
    }),
    reportCreate: builder.mutation({
      query: (payload) => ({
        url: `${REPORTS_PATH}`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['Semesters']
    }),
    reportRemove: builder.mutation({
      query: (id) => ({
        url: `${REPORTS_PATH}${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Semesters']
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllReportsQuery, useReportUpdateMutation, useReportCreateMutation, useReportRemoveMutation } = authApi;
