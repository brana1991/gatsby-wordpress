const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const BlogPostTemplates = path.resolve("./src/templates/BlogPost.js")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      allWordpressPost {
        edges {
          node {
            wordpress_id
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    console.log(result)
    const BlogPosts = result.data.allWordpressPost.edges
    BlogPosts.forEach(post => {
      createPage({
        path: `/post/${post.node.slug}`,
        component: BlogPostTemplates,
        context: {
          id: post.node.wordpress_id,
        },
      })
    })
  })
}
