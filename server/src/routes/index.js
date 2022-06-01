const socialFeedRoute = require("./SocialFeedRoute.js");
const userRoute = require("./UserRoute");
const mathRoute = require("./MathRoute");
const profileRoute = require("./ProfileRoute");
const route = require("../constant/ConstantRoutes");
function routes(app) {
  app.use(route.POST, socialFeedRoute);
  app.use(route.AUTH, userRoute);
  app.use(route.MATCH, mathRoute);
  app.use(route.PROFILE, profileRoute);

}
module.exports = routes;
