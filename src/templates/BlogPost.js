import React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"

import "./_blog.scss"

const BlogPostTemplate = () => {
  const data = useStaticQuery(graphql`
    query NonPageQuery {
      allWordpressPost(sort: { fields: [date], order: DESC }) {
        edges {
          node {
            id
            date(formatString: "/YYYY/MM/DD/")
            featured_media {
              localFile {
                childImageSharp {
                  resolutions(width: 300, height: 300) {
                    src
                    width
                    height
                  }
                }
              }
            }
            slug
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <section className="container container--narrow blog-section">
        <div className="post-item">
          <a
            className="post-item-img relative"
            src={
              data.allWordpressPost.edges[0].node.featured_media.localFile
                .childImageSharp.resolutions.src
            }
            style={{
              backgroundImage: `url(${data.allWordpressPost.edges[0].node.featured_media.localFile.childImageSharp.resolutions.src})`,
            }}
          ></a>
          <div className="meta-box">
            <h2 className="post-item-headline">
              <a className="gray-text" href=""></a>
            </h2>
            <div className="generic-content">
              <p className="excerpt"></p>
            </div>
            <p className="read-more no-b-m">
              <a className="blue-link" href="">
                Read-more
              </a>
            </p>
          </div>
        </div>
        <div className="pagination-wrapper text-center">
          <div className="pagination"></div>
        </div>
      </section>
    </Layout>
  )
}
export default BlogPostTemplate
