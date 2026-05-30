import { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/layout";
import ShareBtns from "../components/shareBtns";
import { PageSEO } from "../components/pageSEO";
import { getPageData } from "../lib/page";
import { isURL } from "../lib/helper";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { config } from "../site.config";

export async function getStaticProps() {
  const pageData = await getPageData("about");
  return {
    props: {
      pageData,
    },
  };
}

type Props = {
  pageData: {
    title: string;
    content: string;
    slug: string;
  };
};

const About: NextPage<Props> = ({ pageData }) => {
  const { slug, title, content } = pageData;

  const Img = ({ alt, src }: any) => {
    return (
      <picture>
        <img
          src={isURL(src) ? src : require(`../contents/pages/${slug}/${src}`)}
          alt={alt}
        />
      </picture>
    );
  };

  return (
    <Layout>
      <PageSEO title={title} slug={`${slug}`} />
      <div className="p-4 sm:p-7">
        <article className='prose max-w-none break-words'>
          <div className="markdown-body">
            <ReactMarkdown
              components={{ img: Img }}
              remarkPlugins={[gfm]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </article>
        <ShareBtns slug={slug} title={title} />
      </div>
    </Layout>
  );
};

export default About;
