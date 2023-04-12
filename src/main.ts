import yaml from "js-yaml";
import { readFileSync } from "node:fs";
import { ConfigSchema, type ConfigType } from "./types";
import { pino } from "pino";

const logger = pino();
logger.info("Starting Service...");
let config: ConfigType = loadConfig();

function loadConfig() {
  try {
    let loadedConfig = ConfigSchema.parse(
      yaml.load(readFileSync("config.yaml", "utf-8"))
    );
    logger.info("Configuration loaded successfully.");
    return loadedConfig;
  } catch (e) {
    logger.fatal("Failed to load config.yaml!");
    process.exit(1);
  }
}
