import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "https://jsonplaceholder.typicode.com";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => {
    return {
      getPost: builder.query<any, number | void>({
        // query: (title?: string) => `posts?title=${title}`,
        query: (id?: number) => (id ? `posts/${id}` : "posts"),
      }),
    };
  },
});

export const { useGetPostQuery, usePrefetch, useLazyGetPostQuery } = postApi;
