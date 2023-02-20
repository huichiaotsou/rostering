import * as yaml from "js-yaml";
import * as fs from "fs";

let config;

try {
  const path = process.cwd() + "/config/config.yaml";
  config = yaml.load(fs.readFileSync(path, "utf8"));
} catch (e) {
  console.log(e);
}

export default config;
