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