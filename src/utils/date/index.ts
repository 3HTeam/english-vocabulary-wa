import { DATE_FORMATS } from "@/constants/common";

export function formatDate(
  date: string,
  format: string = DATE_FORMATS.DD_MM_YYYY,
): string {
  const dateObj = new Date(date);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  switch (format) {
    case DATE_FORMATS.MM_DD_YYYY:
      return `${month}-${day}-${year}`;
    case DATE_FORMATS.YYYY_MM_DD:
      return `${year}-${month}-${day}`;
    case DATE_FORMATS.DD_MM_YYYY:
    default:
      return `${day}-${month}-${year}`;
  }
}
