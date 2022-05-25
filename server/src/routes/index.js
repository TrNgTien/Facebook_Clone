const socialFeedRoute = require("./SocialFeedRoute.js");
const userRoute = require("./UserRoute");
const mathRoute = require("./MathRoute");
const route = require("../constant/ConstantRoutes");
function routes(app) {
  app.use(route.FEED, socialFeedRoute);
  app.use(route.AUTH, userRoute);
  app.use(route.MATCH, mathRoute);
}
module.exports = routes;
