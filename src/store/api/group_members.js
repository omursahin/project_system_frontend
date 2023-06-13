import { GROUP_MEMBERS_PATH } from "../../helpers/urls";
import baseApi from "./baseApiEndpoints";

// Define a service using a base URL and expected endpoints
export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    groupMemberCreate: builder.mutation({
      query: (payload) => ({
        url: `${GROUP_MEMBERS_PATH}`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['GroupMembers']
    }),
    groupMemberRemove: builder.mutation({
      query: (id) => ({
        url: `${GROUP_MEMBERS_PATH}${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['GroupMembers']
    }),
  }),
  overrideExisting: false,
});

export const { useGroupMemberCreateMutation, useGroupMemberRemoveMutation } = api;
