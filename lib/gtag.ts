import { config } from "../site.config";
export const GA_ID = config.gaID;

export const pageView = (url: URL) => {
  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

type Props = {
  action: string;
  category: string;
  label: string;
  value: number;
};

export const event = ({ action, category, label, value }: Props) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
