import baseApi from "./baseApiEndpoints";
import {LOGIN_URL} from "../../helpers/urls";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => (
        {
            login: builder.mutation(
                {
                    query:(credentials) => ({
                        url: `${LOGIN_URL}`,
                        method: "POST",
                        body: credentials
                    }),
                    transformResponse: (response) => {
                        if(response.access){
                            localStorage.setItem('token', response.access)
                        }
                        return response;
                    },
                    invalidatesTags: ['User'],
                })
        }),
    overrideExisting: false,
})
export const { useLoginMutation } = authApi;
