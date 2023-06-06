import {REPORTS_PATH, SEMESTERS_PATH} from "../../helpers/urls";
import baseApi from "./baseApiEndpoints";

// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: () => `${REPORTS_PATH}`,
        providesTags: ['Reports']
    }),
    reportUpdate: builder.mutation({
      query: (payload) => ({
        url: `${REPORTS_PATH}${payload?.id}/`,
        method: "PATCH",
        body: payload
      }),
      invalidatesTags: ['Reports']
    }),
    reportCreate: builder.mutation({
      query: (payload) => ({
        url: `${REPORTS_PATH}`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['Reports']
    }),
    reportRemove: builder.mutation({
      query: (id) => ({
        url: `${REPORTS_PATH}${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Reports']
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllReportsQuery, useReportUpdateMutation, useReportCreateMutation, useReportRemoveMutation } = authApi;
