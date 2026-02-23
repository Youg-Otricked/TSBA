import fs from "fs";
import os from "os";
import path from "path";
export function setUser(user) {
    try {
        const config = readConfig();
        config.currentUserName = user;
        writeConfig(config);
    }
    catch {
        throw new Error("Config is invalid");
    }
}
export function readConfig() {
    try {
        const config = validateConfig(JSON.parse(fs.readFileSync(getConfigFilePath(), { encoding: 'utf-8' })));
        return config;
    }
    catch {
        throw new Error("Config is invalid");
    }
}
function getConfigFilePath() {
    return path.join(os.homedir(), ".gatorconfig.json");
}
function writeConfig(cfg) {
    fs.writeFileSync(getConfigFilePath(), JSON.stringify({ db_url: cfg.dbUrl, current_user_name: cfg.currentUserName }, null, 2), { encoding: 'utf-8' });
}
function validateConfig(rawConfig) {
    if (rawConfig !== null && typeof rawConfig === "object" && typeof rawConfig.db_url === "string" && typeof rawConfig.current_user_name === "string") {
        return { dbUrl: rawConfig.db_url, currentUserName: rawConfig.current_user_name };
    }
    return { dbUrl: rawConfig.db_url, currentUserName: "" };
}
