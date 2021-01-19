// TODO: ファイルを削除

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter language={language} children={value} />;
  },
};

const markdown = `Here is some JavaScript code:

~~~js
console.log('It works!')
~~~
`;

export default function Hoge() {
  return (
    <>
      <ReactMarkdown renderers={renderers} children={markdown} />
    </>
  );
}
