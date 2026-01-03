export function formatDate(
  date: string,
  format: "dd-mm-yyyy" | "mm-dd-yyyy" | "yyyy-mm-dd" = "dd-mm-yyyy"
): string {
  const dateObj = new Date(date);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  switch (format) {
    case "mm-dd-yyyy":
      return `${month}-${day}-${year}`;
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;
    default:
      return `${day}-${month}-${year}`;
  }
}
