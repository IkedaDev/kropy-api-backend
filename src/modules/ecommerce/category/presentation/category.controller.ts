import { APIResponse, TypeResponse } from "@core/decorators/api-response.js";
import { CategoryService } from "../category.service.js";
import { Context } from "hono";
import { Criteria } from "@core/criteria/criteria.js";
import { categoryResponseSchema } from "../domain/dtos/category-response.dto.js";


export class CategoryController {
    constructor(private service: CategoryService) { }

    @APIResponse({
        message: "Categories retrieved successfully",
        type: TypeResponse.PAGINATED,
    })
    async findBy(c: Context) {
        const { filters, orderBy, orderType, pagination } = c.req.valid(
            "json" as never,
        );
        const tenant = c.get("tenant");
        const { meta, data } = await this.service.findBy(tenant.id, new Criteria({ filters, pagination, orderBy, orderType }));
        return { meta, data: data.map(category => categoryResponseSchema.parse(category)) };
    }
}