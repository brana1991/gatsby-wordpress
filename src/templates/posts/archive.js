import React, { useState } from "react";
import Layout from "../../components/layout";
import Pagination from "../../components/Pagination";
import BlogCard from "../../components/BlogCard/index";
//
import "./_archive.scss";
//
import usePosts from "../../hooks/usePosts";
import { number } from "prop-types";

const ArchivePosts = data => {
  const {
    pageContext: { nodes, pageNumber, hasNextPage, itemsPerPage, allPosts },
    uri,
  } = data;

  console.log(data);

  const { filteredPosts, loadMore } = usePosts(allPosts);
  const relativePath = uri !== "/" ? uri + "/" : uri;
  //

  return (
    <Layout posts={allPosts} isHome="home-page" pageUri={relativePath}>
      <section className="archive-blog">
        {nodes.map((element, index) => {
          if (!nodes && !nodes.length) return null;
          return (
            <BlogCard
              key={element.slug}
              categories={element.categories.nodes[0].name}
              catIcon={
                element.categories.nodes[0].icons.categoryIcons
                  ? element.categories.nodes[0].icons.categoryIcons.sourceUrl
                  : ""
              }
              date={element.date}
              title={element.title}
              excerpt={element.excerpt}
              image={element.featuredImage}
              postUrl={element.uri}
              index={index}
            />
          );
        })}

        {filteredPosts.length !== 0
          ? filteredPosts.map(element => {
              return (
                <BlogCard
                  key={element.slug}
                  categories={element.categories.nodes[0].name}
                  date={element.date}
                  title={element.title}
                  excerpt={element.excerpt}
                  image={element.featuredImage}
                />
              );
            })
          : null}
        <button
          onClick={() => {
            loadMore();
          }}
        >
          UČITAJ JOŠ TEKSTOVA
        </button>

        <Pagination
          pageNumber={pageNumber}
          hasNextPage={hasNextPage}
          allPosts={allPosts}
          itemsPerPage={itemsPerPage}
        />
      </section>
    </Layout>
  );
};

export default ArchivePosts;
