import bucket from "../../configs/s3Configs";

export const preSignedGetUrl = async (Key: string) => {
  const url = await bucket.getSignedUrl("getObject", {
    Key,
    Expires: 60,
  });
  return url;
};
