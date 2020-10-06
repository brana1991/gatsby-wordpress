const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `.env.${activeEnv}`,
});

const crypto = require("crypto");
const { google } = require("googleapis");
const moment = require("moment");

const key = process.env.PRIVATE_KEY.replace(new RegExp("\\\\n", "g"), "\n");

// gatsby-node.js
const createPages = require("./create/createPages");
const createPosts = require("./create/createPosts");

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

// Resolvers for graphQL shema

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;

  await createResolvers({
    WPGraphQL_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl;

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl;
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
  });
};

// Dynamic Creation of Pages

exports.createPagesStatefully = async (
  { graphql, actions, reporter },
  options
) => {
  await createPages({ actions, graphql, reporter }, options);
  await createPosts({ actions, graphql, reporter }, options);
};

// Source data for graphQl node creation and create nodes

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;
  const email = process.env.CLIENT_EMAIL;
  const viewId = `228753180`;
  const scopes = "https://www.googleapis.com/auth/analytics.readonly";

  const jwt = new google.auth.JWT(email, null, key, scopes);
  await jwt.authorize();

  function getGA(date) {
    return google.analytics("v3").data.ga.get({
      auth: jwt,
      ids: "ga:" + viewId,
      "start-date": date,
      "end-date": "today",
      dimensions: "ga:pagePath",
      metrics: "ga:pageviews",
      sort: "-ga:pageviews",
    });
  }

  function createNodes(GAResult, nodeName) {
    for (let [path, count] of GAResult.data.rows) {
      createNode({
        path,
        count: Number(count),
        id: path,
        internal: {
          type: nodeName,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify({ nodeName, path, count }))
            .digest(`hex`),
          mediaType: `text/plain`,
          description: `Page views per path`,
        },
      });
    }
  }

  const recentResult = await getGA(
    moment().add(-30, "days").format("YYYY-MM-DD")
  );
  createNodes(recentResult, `RecentPageViews`);
  const totalResult = await getGA(`2020-02-21`);
  createNodes(totalResult, `TotalPageViews`);
};
