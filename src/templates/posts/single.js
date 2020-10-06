import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import SEO from "../../components/seo";
import Layout from "../../components/layout";
import PostHeaderMeta from "../../components/post-meta/post-header-meta";
import PostFooterMeta from "../../components/post-meta/post-footer-meta";

const SinglePost = data => {
  const {
    pageContext: {
      id,
      postId,
      title,
      excerpt,
      content,
      uri,
      date,
      featuredImage,
      author,
      categories,
      tags,
      prev,
      next,
    },
  } = data;

  return (
    <Layout>
      <SEO title={title} description={excerpt} />
      <article data-id={id} id={`post-${postId}`} className={`post-${postId}`}>
        <PostHeaderMeta uri={uri} title={title} date={date} author={author} />
        <Img fluid={featuredImage.node.imageFile.childImageSharp.fluid} />
        <div
          className="entry-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <PostFooterMeta
          uri={uri}
          date={date}
          author={author}
          categories={categories}
          tags={tags}
        />
      </article>
      {/* #post-${ID} */}
      <nav className="navigation post-navigation" role="navigation">
        <h2 className="screen-reader-text">Post navigation</h2>
        <div className="nav-links">
          {prev && (
            <div className="nav-previous">
              <Link to={`/blog${prev.uri}`} rel="prev">
                <span className="meta-nav" aria-hidden="true">
                  Previous Post
                </span>
                <span className="screen-reader-text">Previous post:</span>{" "}
                <br />
                <span
                  className="post-title"
                  dangerouslySetInnerHTML={{ __html: prev.title }}
                />
              </Link>
            </div>
          )}
          {next && (
            <div className="nav-next">
              <Link to={`/blog${next.uri}`} rel="next">
                <span className="meta-nav" aria-hidden="true">
                  Next Post
                </span>
                <span className="screen-reader-text">Next post:</span> <br />
                <span
                  className="post-title"
                  dangerouslySetInnerHTML={{ __html: next.title }}
                />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </Layout>
  );
};

export default SinglePost;
