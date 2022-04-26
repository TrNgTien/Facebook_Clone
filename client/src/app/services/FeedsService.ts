import * as httpClient from "./BaseService";
import Path from "../constants/PathURL";
// interface IAddFeedService {
//   userId: string;
//   description: string;
//   feedAttachments: any;
// }
const AddFeed = (reqBody: any) => {
  return httpClient.post(Path.FEEDS_ADD, reqBody);
};

export { AddFeed };
