import { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/layout";
import ShareBtns from "../components/shareBtns";
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

  const Img = ({ alt, src }: { alt: string; src: string }) => {
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
      <div className="shadow-md mt-8">
        <div className="p-7">
          <article>
            <div className="markdown-body">
              <ReactMarkdown
                renderers={{ image: Img }}
                plugins={[gfm]}
                children={content}
              />
            </div>
          </article>
          <ShareBtns slug={slug} title={title} />
          <div className="text-center mt-3">
            <Link
              href={`${config.repo}/edit/main/contents/pages/about/index.md`}
            >
              <a className="text-gray-400" target="_blank">
                Edit on GitHub
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
