import * as yaml from "js-yaml";
import * as fs from "fs";

let config;

try {
  const path = process.cwd() + "/config/config.yaml";
  config = yaml.load(fs.readFileSync(path, "utf8"));
} catch (e) {
  if (e.toString().includes("no such file or directory")) {
    console.debug(
      "config.yaml file is not found,\nmake sure you add it under the /config directory"
    );
    process.exit();
  }
  console.log(e);
}

export default config;
