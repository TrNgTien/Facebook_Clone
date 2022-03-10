const socialFeedRoute = require("./SocialFeedRoute.js");
const userRoute = require("./UserRoute");
const route = require("../constant/ConstantRoutes");
function routes(app) {
  app.use(route.FEED, socialFeedRoute);
  app.use(route.AUTH, userRoute);
}
module.exports = routes;
