import KoaRouter from "koa-router";
import {Company, Item} from "../storage/database.js";
import {requireAdmin, requireAuthentication} from "../middleware/authentication.mjs";

export const router = new KoaRouter();

// List all items of a company
router.get("/company/:nit/items", requireAdmin, async ctx => {
    const nitId = ctx.params.nit;
    const company = await Company.findOne({ where: { nit: nitId } });

    if (!company) {
        ctx.response.status = 404;
        ctx.response.body = "Company not found.";
        return;
    }

    const items = await Item.findAll({ where: { companyNit: nitId } });

    ctx.response.status = 200;
    ctx.response.body = items;
});

// Create an item for a company
router.post("/company/:nit/items", requireAdmin, async ctx => {
    const nitId = ctx.params.nit;
    const company = await Company.findOne({ where: { nit: nitId } });

    if (!company) {
        ctx.response.status = 404;
        ctx.response.body = "Company not found.";
        return;
    }

    const newItemData = ctx.request.body;
    newItemData.companyNit = nitId;  // asociar el nuevo Item a la Company
    const newItem = await Item.create(newItemData);

    ctx.response.status = 201;
    ctx.response.body = newItem;
});

// Update an item
router.put("/item/:id", requireAdmin, async ctx => {
    const itemId = ctx.params.id;
    const updatedItemData = ctx.request.body;

    const item = await Item.findByPk(itemId);

    if (!item) {
        ctx.response.status = 404;
        ctx.response.body = "Item not found.";
        return;
    }

    item.set(updatedItemData);

    await item.save();

    ctx.response.status = 204;
});

// Delete an item
router.delete("/item/:id", requireAdmin, async ctx => {
    const itemId = ctx.params.id;

    const item = await Item.findByPk(itemId);

    if (!item) {
        ctx.response.status = 404;
        ctx.response.body = "Item not found.";
        return;
    }

    await item.destroy();

    ctx.response.status = 204;
});
