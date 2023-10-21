import { compareAsc, format } from "date-fns";

export const DataTime = () => {
  const year = new Date();
  const data = format(year, "yyyy-MM-dd");
  console.log("data===============", data);
};
