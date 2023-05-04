const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const dbPath = path.join(__dirname, "db.json");
const readFile = promisify(fs.readFile);

exports.getDb = async () => {
    const data = await readFile(dbPath);
    return JSON.parse(data);
};

// 使用try catch 获取

const db = await getDb();
