import { format, parseISO } from "date-fns";

export function formatTime(date: string) {
  if (date) {
    const datePart = date?.split("+");
    if (datePart.length > 1) {
      const dataISO = datePart[0];

      const formatedDate = dataISO && format(parseISO(dataISO), "hh:mm");

      return formatedDate ?? "-";
    }
  }
  return "-";
}
