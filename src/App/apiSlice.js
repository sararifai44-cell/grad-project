import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// مفتاح التوكن الخاص بمشروع أندلس
export const ANDALUS_TOKEN_KEY = "andalus_access_token";

const getCookie = (name) => {
  const v = document.cookie
    .split("; ")
    .find((x) => x.startsWith(`${name}=`))
    ?.split("=")[1];
  return v ? decodeURIComponent(v) : null;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // الرابط الأساسي لباك إند أندلس كما هو موضح في التوثيق
    baseUrl:
      import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1",
    credentials: "omit",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");

      // ضبط اللغة تلقائياً (عربي/إنجليزي)
      const lang = (navigator.language || "ar").toLowerCase();
      headers.set("Accept-Language", lang.startsWith("ar") ? "ar" : "en");

      // جلب التوكن من الكوكيز وإضافته للهيدر
      const token = getCookie(ANDALUS_TOKEN_KEY);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  // الأنواع التي سنستخدمها للـ Caching (حسب تطبيقات المشروع)
  tagTypes: ["User", "City", "Era", "Event", "Poem", "Collection", "Scene"],
  endpoints: () => ({}),
});
