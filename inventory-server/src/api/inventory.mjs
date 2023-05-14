import KoaRouter from "koa-router";
import {Company, Item} from "../storage/database.mjs";
import {requireAdmin, requireAuthentication} from "../middleware/authentication.mjs";
import {deleteModelFromSequelize} from "../middleware/shared.js";

export const router = new KoaRouter();

const requiredKeys = [
    "name",
    "price",
    "quantity",
    "description",
    "companyNit"
];


router.get("/inventory/company/:nit", requireAuthentication, async ctx => {
    const nitId = ctx.request.params.nit;

    ctx.response.body = JSON.stringify(await Item.findAll({
        where: {
            companyNit: nitId
        }
    }));
    ctx.response.status = 200;
});

router.get("/inventory/:id", requireAuthentication, async ctx => {
    const itemId = ctx.request.params.id;

    ctx.response.body = JSON.stringify(await Item.findAll({
        where: {
            id: itemId
        }
    }));
    ctx.response.status = 200;
});

router.delete(
    "/inventory/:id",
    requireAdmin,
    async (ctx, next) => {
        ctx.state.currentModel = Item;
        await next();
    },
    deleteModelFromSequelize
);

router.put("/inventory/:id", requireAdmin, async ctx => {
    const itemId = ctx.request.params.id;
    const newItem = ctx.request.body;

    for (const key of requiredKeys) {
        // No need for this.
        if (key === "companyNit") {
            continue;
        }

        if (!(key in newItem)) {
            ctx.response.status = 400;
            ctx.response.body = `The ${key} field is missing`
            return;
        }
    }

    const item = await Item.findAll({
        where: {
            id: itemId
        }
    });

    if (item == null || item.length === 0) {
        ctx.response.body = "Not found."
        ctx.response.status = 400;
        return;
    }

    const itemInstance = item[0];

    itemInstance.name = newItem.name;
    itemInstance.description = newItem.description;
    itemInstance.price = newItem.price;
    itemInstance.quantity = newItem.quantity;

    await itemInstance.save();

    ctx.response.body = "Modified."
    ctx.response.status = 200;
});

router.post("/inventory", requireAdmin, async ctx => {
    const newItem = ctx.request.body;

    for (const key of requiredKeys) {
        if (!(key in newItem)) {
            ctx.response.body = `The ${key} field is missing`
            ctx.response.status = 400;
            return;
        }
    }

    // May not be needed, but this is great to keep a database like SQLite synced up.
    const company = await Company.findAll({
        where: {
            nit: newItem["companyNit"]
        }
    });

    if (company == null || company.length === 0) {
        ctx.response.body = "Company to attach this item to was not found."
        ctx.response.status = 400;
        return;
    }

    let createdItem;
    try {
        createdItem = await Item.create({
            name: newItem["name"],
            description: newItem["description"],
            price: newItem["price"],
            quantity: newItem["quantity"],
            companyNit: newItem["companyNit"]
        });
    } catch(e) {
        if (e.errors[0].validatorKey === "not_unique") {
            ctx.body = "Item already exists.";
            ctx.response.status = 400;
            return;
        }

        ctx.body = "There was an error while saving this item. Perhaps a field was of incorrect type.";
        ctx.response.status = 400;
        return;
    }

    ctx.body = `Created as ${createdItem.id}`;
    ctx.response.status = 200;
});