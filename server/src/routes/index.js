const socialFeedRoute = require("./SocialFeedRoute.js");
const userRoute = require("./UserRoute");
const profileRoute = require("./ProfileRoute");
const friendRoute = require("./FriendRoute");
const route = require("../constant/ConstantRoutes");
function routes(app) {
  app.use(route.POST, socialFeedRoute);
  app.use(route.AUTH, userRoute);
  app.use(route.PROFILE, profileRoute);
  app.use(route.FRIEND, friendRoute);
}
module.exports = routes;
