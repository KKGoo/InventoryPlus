import KoaRouter from "koa-router";
import {User} from "../storage/database.mjs";
import {hashPassword, validatePassword} from "../utils/crypto.mjs";

export const router = new KoaRouter();


const bodyCredentialsMiddleware = async (ctx, next) => {
    const credentials = ctx.request.body;

    if (!("email" in credentials) || !("password" in credentials)) {
        ctx.response.status = 400;
        ctx.body = "Email and/or password have to be declared";
        return;
    }

    if (!(typeof credentials.email === "string") || !(typeof credentials.password === "string")) {
        ctx.response.status = 400;
        ctx.body = "Email and password must be strings.";
        return;
    }

    ctx.bodyCredentials = credentials;
    await next();
};


router.post("/login", bodyCredentialsMiddleware, async ctx => {
    const credentials = ctx.bodyCredentials;

    if (("userId" in ctx.session) || ctx.session.userId != null) {
        ctx.response.status = 201;
        ctx.body = "Already logged in.";
        return;
    }

    const localUser = await User.findAll({
        where: {
            email: credentials.email
        }
    });

    if (localUser == null || localUser.length === 0) {
        ctx.response.status = 400;
        ctx.body = "This user doesn't exist";
        return;
    }

    if (!await validatePassword(credentials.password, localUser[0].password)) {
        ctx.response.status = 400;
        ctx.body = "Password is incorrect";
        return;
    }

    ctx.session.userId = localUser[0].id
    ctx.session.email = localUser[0].email
    ctx.session.role = localUser[0].role
    ctx.body = "Logged in";
    ctx.response.status = 200;
});

router.post("/register", bodyCredentialsMiddleware, async ctx => {
    const credentials = ctx.bodyCredentials;

    try {
        await User.create({
            email: credentials.email,
            password: await hashPassword(credentials.password),
            role: 1
        });
    } catch(e) {
        if (e.errors[0].validatorKey === "not_unique") {
            ctx.body = "User already exists.";
            ctx.response.status = 400;
            return;
        }

        ctx.body = "There was an error while saving.";
        ctx.response.status = 400;
        return;
    }

    ctx.body = "Created";
    ctx.response.status = 200;
});

router.get('/logout', async ctx => {
    ctx.session = null;
    ctx.body = "Logged out."
    ctx.response.status = 200;
});