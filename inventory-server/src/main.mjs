import Koa from 'koa';
import KoaRouter from "koa-router";
import session from "koa-generic-session";
import SQLite3Store from "koa-sqlite3-session";
import {router as authRouter} from "./api/auth.mjs";
import {router as companyRouter} from "./api/company.mjs";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

const app = new Koa();
const router = new KoaRouter();


app.keys = ['@XcCJcWJW^$RgqldM4R50VFcuIBS&3c1Ctv^BwaB925WWVboDO'];

app.use(session({
    store: new SQLite3Store("./db/sessions.db", {
        ttl: 86400000,
        interval: 120000
    })
}));

app.use(cors({
    allowHeaders: ["koa.sid", "koa.sid.sig"]
}));
app.use(bodyParser());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
app.use(companyRouter.routes());
app.use(companyRouter.allowedMethods());

app.use( async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = 500;
        ctx.body = "Internal error";
    }
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
