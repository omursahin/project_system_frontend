import {COURSES_PATH, GROUPS_PATH, SEMESTERS_PATH} from "../../helpers/urls";
import baseApi from "./baseApiEndpoints";

// Define a service using a base URL and expected endpoints
export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGroups: builder.query({
      query: () => `${GROUPS_PATH}`,
        providesTags: ['Groups']
    }),
    getGroupById: builder.query({
      query: (id) => `${GROUPS_PATH}${id}/`,
      providesTags: ['Groups']
    }),
    groupUpdate: builder.mutation({
      query: (payload) => ({
        url: `${GROUPS_PATH}${payload?.id}/`,
        method: "PATCH",
        body: payload
      }),
      invalidatesTags: ['Groups']
    }),
    groupCreate: builder.mutation({
      query: (payload) => ({
        url: `${GROUPS_PATH}`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['Groups']
    }),
    groupRemove: builder.mutation({
      query: (id) => ({
        url: `${GROUPS_PATH}${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Groups']
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllGroupsQuery, useGetGroupByIdQuery, useGroupUpdateMutation, useGroupCreateMutation, useGroupRemoveMutation } = api;
