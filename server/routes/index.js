const socialFeedRoute = require("./SocialFeedRoute.js");
const FEED = require("../constant/ConstantRoutes");
function routes(app) {
  app.use('/feed', socialFeedRoute);
  app.use('/feedss', socialFeedRoute);

}
module.exports = routes;
