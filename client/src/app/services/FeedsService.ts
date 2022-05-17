import * as httpClient from "./BaseService";
import Path from "../constants/PathURL";
import { postFetch } from "../slices/PostSlice";
// interface IAddFeedService {
//   userId: string;
//   description: string;
//   feedAttachments: any;
// }
const AddFeed = (reqBody: any) => {
  return httpClient.post(Path.FEEDS_ADD, reqBody);
};
const GetAllFeed = async (dispatch: any) => {
  try {
    const res = await httpClient.get(Path.FEEDS_GET);
    console.log("post res: ", res);
    dispatch(postFetch(res.data));
  } catch (error) {
    alert(error);
  }
};

export { AddFeed, GetAllFeed };
