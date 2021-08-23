import nodeFetch from "node-fetch";

export default {
  accessKey: process.env.UNSLASH_ACCESS_KEY || "",
  fetch: nodeFetch as any,
};
