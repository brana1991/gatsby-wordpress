import React from "react";
import Layout from "../../components/layout";

const Categories = props => {
  const {
    pageContext: { nodes },
    uri,
  } = props;
  //
  const relativePath = uri !== "/" ? uri + "/" : uri;

  return (
    <Layout posts={nodes} isHome="home-page" pageUri={relativePath}></Layout>
  );
};

export default Categories;
