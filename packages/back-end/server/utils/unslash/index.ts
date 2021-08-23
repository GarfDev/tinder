import { createApi } from "unsplash-js";
import Config from "~/config";

const unsplash = createApi(Config.unslash);

export default unsplash;
