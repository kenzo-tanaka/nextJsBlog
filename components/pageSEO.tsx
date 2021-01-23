import Head from "next/head";
import { config } from "../site.config";

type Props = {
  title: string;
  description?: string;
  ogImageUrl?: string;
};

export const pageSEO: React.FC<Props> = (props) => {
  const { title, description, ogImageUrl } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
    </Head>
  );
};
