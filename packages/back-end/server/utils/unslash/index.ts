import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

const unsplash = createApi({
  accessKey: "6shqDo4NVu85fDCejx1lMNaA3p1eHGe6trXqFN2smho",
  fetch: nodeFetch as any,
});

export default unsplash;
