//src/templates/pages/index.js

import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

const Page = data => {
  const {
    pageContext: { nodes, title },
    uri,
  } = data;
  //
  const relativePath = uri !== "/" ? uri + "/" : uri;

  return (
    <Layout posts={nodes} pageUri={relativePath}>
      {/* <SEO title={title} /> */}
      <h1>{title} homeee</h1>
    </Layout>
  );
};

export default Page;
