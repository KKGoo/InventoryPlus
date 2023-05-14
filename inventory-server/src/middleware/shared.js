export const deleteModelFromSequelize = async (ctx, next) => {
    const Model = ctx.state.currentModel;

    const result = await Model.destroy({
        where: {
            [Model.primaryKeyAttributes[0]]: ctx.request.params.id
        }
    });

    if (result === 0) {
        ctx.response.body = "Not found."
        ctx.response.status = 400;
        return;
    }

    ctx.response.body = "Deleted."
    ctx.response.status = 200;

    await next();
};