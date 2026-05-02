import { apiSlice } from "../../App/apiSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    analyzeEvent: builder.mutation({
      query: (searchQuery) => ({
        url: "/events/analyze", // بدون شرطة مائلة في النهاية لتجنب خطأ 404
        method: "POST",
        body: {
          text: searchQuery, // الباك إند يتوقع المتغير باسم text
          top_k: 3,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAnalyzeEventMutation } = eventsApiSlice;
