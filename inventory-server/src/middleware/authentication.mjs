export const requireAuthentication = async (ctx, next) => {
    if (!("userId" in ctx.session) || ctx.session.userId == null) {
        ctx.response.status = 401;
        ctx.session = null;
        ctx.body = "Unauthorized";
        return;
    }

    await next();
};

export const requireAdmin = async (ctx, next) => {
    if (!("role" in ctx.session) || Number(ctx.session.role) !== 0) {
        ctx.response.status = 403;
        ctx.session = null;
        ctx.body = "Unauthorized";
        return;
    }

    await next();
};

export const bodyCredentialsMiddleware = async (ctx, next) => {
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