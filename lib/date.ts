import { format } from "date-fns";

// Chỉ hiển thị giờ phút giây
export const HH_MM = "HH:mm";
export const HH_MM_SS = "HH:mm:ss";
export const DD_MM_YYYY = "dd/MM/yyyy";
export const DD_MM_YYYY_HH_MM = "dd/MM/yyyy HH:mm";
export const DD_MM_YYYY_HH_MM_SS = "dd/MM/yyyy HH:mm:ss";
export const DD_MM_YYYY_HH_MM_SS_SSS = "dd/MM/yyyy HH:mm:ss.SSS";

export const MM_HH_DD_MM_YYYY = "mm:HH dd-MM-yyyy";

// ISO-like (hay dùng để gửi API)
export const ISO_DATE = "yyyy-MM-dd";
export const ISO_DATE_TIME = "yyyy-MM-dd'T'HH:mm:ss";

// Hiển thị tháng, năm
export const MMMM_YYYY = "MMMM yyyy"; // Ví dụ: September 2025
export const MM_YYYY = "MM/yyyy"; // Ví dụ: 09/2025

// Hiển thị ngày tháng kèm chữ
export const D_MMM = "d MMM"; // Ví dụ: 25 Sep
export const D_MMM_YYYY = "d MMM yyyy"; // Ví dụ: 25 Sep 2025

// Tuần & năm
export const WEEK_OF_YEAR = "'Tuần' w, yyyy"; // Ví dụ: Tuần 39, 2025

// Chỉ ngày trong tuần
export const DAY_OF_WEEK = "EEEE"; // Ví dụ: Thursday
export const DAY_SHORT = "EEE"; // Ví dụ: Thu

// Với timezone offset
export const WITH_TZ = "yyyy-MM-dd HH:mm:ssXXX"; // Ví dụ: 2025-09-25 23:15:00+07:00

export const formatDate = (date: Date | string, type = DD_MM_YYYY) => {
  const castDate = date instanceof Date ? date : new Date(date);

  return format(castDate, type);
};
