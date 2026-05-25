import { createRoute } from "@hono/zod-openapi";

import { Context } from "hono";
import { BrandService } from "../brand.service.js";
import { BrandCMSRepository } from "../repository/brand-cms.repository.js";
import { BrandController } from "./brand.controller.js";
import { CriteriaRequestSchema } from "@core/criteria/schemas/criteria-request.schema.js";
import { createPaginatedSuccessSchema } from "@core/models/api-response.model.js";
import { brandResponseSchema } from "../domain/dtos/brand-response.dto.js";


const service = new BrandService(new BrandCMSRepository());
const controller = new BrandController(service);


const findBy = createRoute({
    method: "post",
    path: "/ecommerce/brand/paginated",
    tags: ["Ecommerce"],
    summary: "List brands with pagination",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CriteriaRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Paginated list of clients",
            content: {
                "application/json": {
                    schema: createPaginatedSuccessSchema(brandResponseSchema),
                },
            },
        },
    },
});

export const brandRoutes = {
    findBy: findBy,
};

export const brandHandlers = {
    findBy: (c: Context) => controller.findBy(c) as any,
};
