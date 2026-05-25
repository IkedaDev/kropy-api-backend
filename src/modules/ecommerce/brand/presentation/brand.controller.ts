import { APIResponse, TypeResponse } from "@core/decorators/api-response.js";

import { Context } from "hono";
import { Criteria } from "@core/criteria/criteria.js";
import { BrandService } from "../brand.service.js";
import { brandResponseSchema } from "../domain/dtos/brand-response.dto.js";



export class BrandController {
    constructor(private service: BrandService) { }

    @APIResponse({
        message: "Brands retrieved successfully",
        type: TypeResponse.PAGINATED,
    })
    async findBy(c: Context) {
        const { filters, orderBy, orderType, pagination } = c.req.valid(
            "json" as never,
        );
        const tenant = c.get("tenant");
        const { meta, data } = await this.service.findBy(tenant.id, new Criteria({ filters, pagination, orderBy, orderType }));
        return { meta, data: data.map(brand => brandResponseSchema.parse(brand)) };
    }
}