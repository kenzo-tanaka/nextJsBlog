import React from "react";
import Head from "next/head";
import { config } from "../site.config";

type Props = {
  title: string;
  slug?: string;
  description?: string;
  ogImageUrl?: string;
};

export const PageSEO: React.FC<Props> = (props) => {
  const { title, slug, description, ogImageUrl } = props;
  const pageUrl = `${config.siteRoot}/${slug || ""}`;
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:url" content={pageUrl} />
      <link rel="icon" href="/favicon.ico"></link>
      <meta
        property="og:description"
        content={description || config.siteMeta.description}
      />
      <meta
        name="description"
        content={description || config.siteMeta.description}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site" content={config.siteMeta.title} />
      <meta
        property="og:image"
        content={ogImageUrl || `${config.siteRoot}/images/ogp.jpg`}
      />
    </Head>
  );
};
