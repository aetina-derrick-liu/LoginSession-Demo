import path from "path";
import sqlite3 from 'better-sqlite3'
import { readdirSync } from "fs";
import { readFileSync } from "fs";
import { existsSync } from "fs";

const dbPath =
  process.env.DATABASE_FILE_PATH ||
  path.join(__dirname, '../../database.sqlite');

const exists = existsSync(dbPath);
const db = sqlite3(dbPath, {});
console.log(exists)
console.log(dbPath)

if (!exists) {
  const migrations = path.join(path.join(__dirname, '..','..'), 'migrations');
  console.log(migrations)
  const files = readdirSync(migrations);
  files.sort();
  files.forEach(f => {
    if (!f.endsWith('.up.sql')) return;
    const sql = readFileSync(path.join(migrations, f), 'utf8');
    console.log(sql)
    db.exec(sql);
  });
}

export const getDb = ()=> db