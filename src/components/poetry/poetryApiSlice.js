import { apiSlice } from "../../App/apiSlice";

export const poetryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // تعريف عملية التحليل كميوتيشن لأنها طلب POST
    analyzePoetry: builder.mutation({
      query: (poemData) => ({
        url: "/poetry/analyze",
        method: "POST",
        body: poemData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAnalyzePoetryMutation } = poetryApiSlice;
