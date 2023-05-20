import {SEMESTERS_PATH} from "../../helpers/urls";
import baseApi from "./baseApiEndpoints";

// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: () => `${SEMESTERS_PATH}`,
        providesTags: ['Semesters']
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllSemestersQuery } = authApi;
