import Head from "next/head";
import { config } from "../site.config";

type Props = {
  title: string;
  slug?: string;
  description?: string;
  ogImageUrl?: string;
};

export const pageSEO: React.FC<Props> = (props) => {
  const { title, slug, description, ogImageUrl } = props;
  const pageUrl = `${config.siteRoot}/${slug || ""}`;
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:url" content={pageUrl} />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site" content={config.siteMeta.title} />
      <meta
        property="og:image"
        content={ogImageUrl || `${config.siteRoot}/images/ogp.jpg`}
      />
    </Head>
  );
};
