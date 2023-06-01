import {LOGIN_PATH, USER_PATH} from "../../helpers/urls";
import baseApi from "./baseApiEndpoints";

// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${LOGIN_PATH}`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Me"],
      transformResponse: (response, meta, arg) => {
        if(response.access){
        localStorage.setItem('token', response.access);
        }
        return response
      }
    }),
    me: builder.query({
      query: () => `${USER_PATH}`,
        providesTags: ['Me'],
      transformResponse: (response, meta, arg) => {
        return response;
      }
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useMeQuery } = authApi;

