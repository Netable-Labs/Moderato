import yaml from "js-yaml";
import { readFileSync } from "node:fs";
import { ConfigSchema, type ConfigType } from "./types";

let config: ConfigType = loadConfig();

function loadConfig() {
  try {
    return ConfigSchema.parse(yaml.load(readFileSync("config.yaml", "utf-8")));
  } catch (e) {
    console.error("Failed to load config.yaml!");
    process.exit(1);
  }
}
