const socialFeedRoute = require("./SocialFeedRoute.js");
const FEED = require("../constant/ConstantRoutes");
function routes(app) {
  app.use('/feed', socialFeedRoute);
  app.use('/feedsss', socialFeedRoute);
}
module.exports = routes;
