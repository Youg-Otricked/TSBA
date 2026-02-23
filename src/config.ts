import fs from "fs";
import os from "os";
import path from "path";
export type Config = {
    dbUrl: string;
    currentUserName: string;
};
export function setUser(user: string) {
    try {
        const config: Config = readConfig();
        config.currentUserName = user;
        writeConfig(config);
    } catch {
        throw new Error("Config is invalid");
    }
}
export function readConfig(): Config {
    try {
        const config: Config = validateConfig(JSON.parse(fs.readFileSync(getConfigFilePath(), {encoding: 'utf-8'})));
        return config;
    } catch {
        throw new Error("Config is invalid");
    }
}
function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}
function writeConfig(cfg: Config): void {
    fs.writeFileSync(getConfigFilePath(), JSON.stringify({db_url: cfg.dbUrl, current_user_name: cfg.currentUserName}, null, 2), {encoding: 'utf-8'});
}
function validateConfig(rawConfig: any): Config {
    if (rawConfig !== null && typeof rawConfig === "object" && typeof rawConfig.db_url === "string" && typeof rawConfig.current_user_name === "string") {
        return {dbUrl: rawConfig.db_url, currentUserName: rawConfig.current_user_name};
    }
    return {dbUrl: rawConfig.db_url, currentUserName: ""}
}