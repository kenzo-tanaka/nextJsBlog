import React from "react";
import { parseISO, format, parse } from "date-fns";

type Props = {
  dateString: string;
};

const Date: React.FC<Props> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "yyyy/LL/dd")}</time>;
};

export default Date;
