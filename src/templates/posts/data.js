// src/templates/posts/data.js
const PostTemplateFragment = `
  fragment PostTemplateFragment on WPGraphQL_Post {
    id
    postId
    title
    content
    link
    categories {
      nodes {
        name
        slug
        id
      }
    }
    tags {
      nodes {
        slug
        name
        id
      }
    }
    author {
      node {
        name
        slug
      }
    }
  }
`;

const BlogPreviewFragment = `
  fragment BlogPreviewFragment on WPGraphQL_Post {
    id
    postId
    title
    uri
    date
    slug
    excerpt
    content
    featuredImage {
      node {
        sourceUrl
      }
    }
    author {
      node {
        name
        slug
      }
    }
    categories {
      nodes {
        icons {
          categoryIcons {
            sourceUrl
          }
        }
      }
    }
  }
`;

module.exports.PostTemplateFragment = PostTemplateFragment;
module.exports.BlogPreviewFragment = BlogPreviewFragment;
