import { apiSlice, ANDALUS_TOKEN_KEY } from "../../App/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/token/", // المسار الصحيح حسب التوثيق
        method: "POST",
        body: credentials,
      }),
      // منطق حفظ التوكن في الكوكيز عند نجاح الطلب
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // حفظ التوكن في الكوكيز كما في بنيتك المفضلة
          document.cookie = `${ANDALUS_TOKEN_KEY}=${data.access}; path=/; max-age=86400; SameSite=Lax`;
          localStorage.setItem("refresh_token", data.refresh); // حفظ مفتاح التحديث اختيارياً
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApiSlice;
