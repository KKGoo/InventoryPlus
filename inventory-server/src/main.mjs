import Koa from "koa";
import KoaRouter from "koa-router";
import session from "koa-generic-session";
import SQLite3Store from "koa-sqlite3-session";
import {router as authRouter} from "./api/auth.mjs";
import {router as companyRouter} from "./api/company.mjs";
import {router as inventoryRouter} from "./api/inventory.mjs"
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

const app = new Koa();
const router = new KoaRouter();

if (!("COOKIE_DOMAIN" in process.env)) {
    process.env["COOKIE_DOMAIN"] = "";
}

app.keys = ["@XcCJcWJW^$RgqldM4R50VFcuIBS&3c1Ctv^BwaB925WWVboDO"];

app.use(
    session({
        store: new SQLite3Store("./db/sessions.db", {
            ttl: 86400000,
            interval: 120000,
        }),
        cookie: {
            path: "/",
            httpOnly: true,
            maxAge: 86400000,
            overwrite: true,
            signed: true,
            domain: process.env["COOKIE_DOMAIN"],
        },
    })
);

app.use(
    cors({
        allowHeaders: [
            "Accept",
            "Accept-Encoding",
            "Accept-Language",
            "content-type",
            "Connection",
            "Host",
            "Origin",
            "Referer",
            "User-Agent",
        ],
        credentials: true,
    })
);

app.use(bodyParser());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
app.use(companyRouter.routes());
app.use(companyRouter.allowedMethods());
app.use(inventoryRouter.routes());
app.use(inventoryRouter.allowedMethods());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = 500;
        ctx.body = "Internal error";
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
