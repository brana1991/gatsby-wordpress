import React from "react";
import Img from "gatsby-image";
import SEO from "../../components/seo";
import { Link } from "gatsby";
import NewsLetter from "../News-letter/index";

const BlogCard = ({
  categories,
  date,
  title,
  excerpt,
  image = "",
  catIcon = "",
  postUrl,
  index,
}) => {
  const featuredImage = image ? image.node.imageFile.childImageSharp.fluid : "";
  const style = { "--catIcon": `url("${catIcon}")` };
  //
  return (
    <>
      <SEO title={title} description={excerpt} />
      <div className="single-card">
        <Link
          to={`blog${postUrl}`}
          className="featured-image relative"
          style={style}
        >
          <Img fluid={featuredImage} />
        </Link>
        <h3 className="post-category">{categories}</h3>
        <p className="post-date">{date}</p>
        <div className="card-info">
          <h2 className="post-title">{title}</h2>
          <div
            className="excerpt"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
      </div>
      {index == 3 && <NewsLetter />}
    </>
  );
};

export default BlogCard;
