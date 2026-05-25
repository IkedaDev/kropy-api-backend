import { createRoute } from "@hono/zod-openapi";
import { CategoryService } from "../category.service.js";
import { CategoryCMSRepository } from "../repository/category-cms.repository.js";
import { CategoryController } from "./category.controller.js";
import { CriteriaRequestSchema } from "@core/criteria/schemas/criteria-request.schema.js";
import { createPaginatedSuccessSchema } from "@core/models/api-response.model.js";
import { categoryResponseSchema } from "../domain/dtos/category-response.dto.js";
import { Context } from "hono";


const service = new CategoryService(new CategoryCMSRepository());
const controller = new CategoryController(service);


const findBy = createRoute({
    method: "post",
    path: "/ecommerce/category/paginated",
    tags: ["Ecommerce"],
    summary: "List categories with pagination",
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
                    schema: createPaginatedSuccessSchema(categoryResponseSchema),
                },
            },
        },
    },
});

export const categoryRoutes = {
    findBy: findBy,
};

export const categoryHandlers = {
    findBy: (c: Context) => controller.findBy(c) as any,
};
