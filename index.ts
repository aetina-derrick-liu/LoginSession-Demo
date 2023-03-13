import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import * as fs from 'fs/promises'
import { getDb } from './library/db';
import { setup } from './middleware/auth';
import { authHandler } from './middleware/auth';
import { Express } from 'express';
import { checkLoginMiddleware } from './middleware/auth';

const app:Express = express();
const db = getDb()
setup(app);
// 動態選擇環境變數的檔案
dotenv.config({ path: path.resolve(__dirname, `./environments/${process.env.NODE_ENV}.env`) });
app.get('/', (req, res, next) => {
    res.send('Hello, World!!');
});
app.get('/api/auth', authHandler);
app.get('/api/projects', checkLoginMiddleware, (req, res) => {
    res.json({data:[]});
  });
console.log(process.env.NODE_ENV)
app.listen(process.env.PORT, () => console.log(`http server is running at port ${ process.env.PORT }.`));