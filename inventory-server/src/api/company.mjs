import KoaRouter from "koa-router";
import {Company} from "../storage/database.js";
import {requireAdmin, requireAuthentication} from "../middleware/authentication.mjs";

export const router = new KoaRouter();

const requiredKeys = [
    "nit",
    "name",
    "address",
    "phone"
]

router.get("/company/:nit", requireAuthentication, async ctx => {
    const nitId = ctx.request.params.nit;

    ctx.response.body = JSON.stringify(await Company.findAll({
        where: {
            nit: nitId
        }
    }));
    ctx.response.status = 200;
});

router.delete("/company/:nit", requireAdmin, async ctx => {
    const nitId = ctx.request.params.nit;

    const result = await Company.destroy({
        where: {
            nit: nitId
        }
    });

    if (result === 0) {
        ctx.response.body = "Not found."
        ctx.response.status = 400;
        return;
    }

    ctx.response.body = "Deleted."
    ctx.response.status = 200;
});

router.put("/company/:nit", requireAdmin, async ctx => {
    const nitId = ctx.request.params.nit;
    const newCompany = ctx.request.body;

    for (const key of requiredKeys) {
        // No need for this.
        if (key === "nit") {
            continue;
        }

        if (!(key in newCompany)) {
            ctx.response.status = 400;
            ctx.response.body = `The ${key} field is missing`
            return;
        }
    }

    const company = await Company.findAll({
        where: {
            nit: nitId
        }
    });

    if (company == null || company.length === 0) {
        ctx.response.body = "Not found."
        ctx.response.status = 400;
        return;
    }

    const companyInstance = company[0];

    companyInstance.name = newCompany.name;
    companyInstance.address = newCompany.address;
    companyInstance.phone = newCompany.phone;

    await companyInstance.save();

    ctx.response.body = "Modified."
    ctx.response.status = 200;
});

router.get("/company", requireAuthentication, async ctx => {
    ctx.response.body = JSON.stringify(await Company.findAll());
    ctx.response.status = 200;
});

router.post("/company", requireAdmin, async ctx => {
    const newCompany = ctx.request.body;

    for (const key of requiredKeys) {
        if (!(key in newCompany)) {
            ctx.response.status = 400;
            ctx.response.body = `The ${key} field is missing`
            return;
        }
    }

    let createdCompany;
    try {
        createdCompany = await Company.create({
            nit: newCompany.nit,
            name: newCompany.name,
            address: newCompany.address,
            phone: newCompany.phone
        });
    } catch(e) {
        if (e.errors[0].validatorKey === "not_unique") {
            ctx.body = "Company already exists.";
            ctx.response.status = 400;
            return;
        }

        ctx.body = "There was an error while saving. Perhaps the user already exists.";
        ctx.response.status = 400;
        return;
    }

    ctx.body = `Created as ${createdCompany.nit}`;
    ctx.response.status = 200;
});